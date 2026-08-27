use cirru_edn::{Edn, EdnListView};
use std::panic::{AssertUnwindSafe, catch_unwind};
use std::ptr;
use std::slice;
use std::thread::sleep;
use std::time::Duration;

pub const ASYNC_PROTOCOL_VERSION: u32 = 1;
pub const ASYNC_STATUS_OK: i32 = 0;
pub const ASYNC_STATUS_HANDLE_CLOSING: i32 = 3;
pub const ASYNC_STATUS_HANDLE_FINISHED: i32 = 4;
pub const ASYNC_STATUS_QUEUE_FULL: i32 = 7;
pub const ASYNC_STATUS_INVALID_PAYLOAD: i32 = 8;
pub const ASYNC_STATUS_INTERNAL_ERROR: i32 = 9;
pub const ASYNC_TASK_ONE_SHOT: u32 = 1;
pub const ASYNC_TASK_SERVER: u32 = 3;
pub const ASYNC_TASK_SERIAL_EVENTS: u32 = 1;
pub const ASYNC_EVENT_EMIT: u32 = 1;
pub const ASYNC_EVENT_COMPLETE: u32 = 2;
pub const ASYNC_EVENT_FAIL: u32 = 3;

pub type AsyncHostEnqueue = unsafe extern "C" fn(u64, u64, u32, u64, *const u8, usize) -> i32;
pub type AsyncTaskCancel = unsafe extern "C" fn(u64, u64, *const u8, usize) -> i32;
pub type AsyncResponseResolve = unsafe extern "C" fn(u64, u64, u32, *const u8, usize) -> i32;
pub type AsyncHostConfigure = unsafe extern "C" fn(u64, u64, u32, u32, u64, Option<AsyncTaskCancel>) -> i32;
pub type AsyncHostOpenResponse = unsafe extern "C" fn(u64, u64, u64, u64, Option<AsyncResponseResolve>, *mut u64) -> i32;

#[repr(C)]
#[derive(Clone, Copy)]
pub struct CalcitFfiAsyncTaskV1 {
  pub protocol_version: u32,
  pub struct_size: u32,
  pub handle: u64,
  pub kind: u32,
  pub flags: u32,
}

#[repr(C)]
#[derive(Clone, Copy)]
pub struct CalcitFfiAsyncHostV1 {
  pub protocol_version: u32,
  pub struct_size: u32,
  pub context: u64,
  pub enqueue: Option<AsyncHostEnqueue>,
  pub configure_task: Option<AsyncHostConfigure>,
  pub open_response: Option<AsyncHostOpenResponse>,
}

#[repr(C)]
#[derive(Clone, Copy)]
pub struct CalcitFfiBuffer {
  pub ptr: *mut u8,
  pub len: usize,
  pub cap: usize,
}

unsafe fn read_abi_header<T>(value: *const T) -> Result<(u32, u32), i32> {
  if value.is_null() {
    return Err(ASYNC_STATUS_INVALID_PAYLOAD);
  }
  let bytes = value.cast::<u8>();
  // SAFETY: every versioned descriptor begins with two readable u32 fields.
  let protocol_version = unsafe { ptr::read_unaligned(bytes.cast::<u32>()) };
  // SAFETY: the second header field begins four bytes after the first.
  let struct_size = unsafe { ptr::read_unaligned(bytes.add(std::mem::size_of::<u32>()).cast::<u32>()) };
  Ok((protocol_version, struct_size))
}

pub unsafe fn copy_task_descriptor(value: *const CalcitFfiAsyncTaskV1) -> Result<CalcitFfiAsyncTaskV1, i32> {
  // SAFETY: forwarded from the versioned descriptor contract.
  let (version, size) = unsafe { read_abi_header(value) }?;
  if version != ASYNC_PROTOCOL_VERSION || size < std::mem::size_of::<CalcitFfiAsyncTaskV1>() as u32 {
    return Err(ASYNC_STATUS_INVALID_PAYLOAD);
  }
  // SAFETY: the validated size covers every v1 field.
  Ok(unsafe { ptr::read_unaligned(value) })
}

pub unsafe fn copy_host_descriptor(value: *const CalcitFfiAsyncHostV1) -> Result<CalcitFfiAsyncHostV1, i32> {
  // SAFETY: forwarded from the versioned descriptor contract.
  let (version, size) = unsafe { read_abi_header(value) }?;
  if version != ASYNC_PROTOCOL_VERSION || size < std::mem::size_of::<CalcitFfiAsyncHostV1>() as u32 {
    return Err(ASYNC_STATUS_INVALID_PAYLOAD);
  }
  // SAFETY: the validated size covers every v1 field.
  Ok(unsafe { ptr::read_unaligned(value) })
}

#[unsafe(no_mangle)]
pub extern "C" fn calcit_ffi_async_version() -> u32 {
  ASYNC_PROTOCOL_VERSION
}

#[unsafe(no_mangle)]
pub extern "C" fn calcit_ffi_buffer_version() -> u32 {
  1
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn calcit_ffi_buffer_free(buffer: CalcitFfiBuffer) {
  if buffer.ptr.is_null() {
    return;
  }
  // SAFETY: Calcit returns exactly the metadata produced by `write_output`.
  drop(unsafe { Vec::from_raw_parts(buffer.ptr, buffer.len, buffer.cap) });
}

pub unsafe fn decode_request(request_ptr: *const u8, request_len: usize) -> Result<Vec<Edn>, String> {
  if request_ptr.is_null() && request_len != 0 {
    return Err("FFI request pointer is null".to_owned());
  }
  let bytes = if request_len == 0 {
    &[]
  } else {
    // SAFETY: the host keeps request bytes readable for the exported call.
    unsafe { slice::from_raw_parts(request_ptr, request_len) }
  };
  let source = std::str::from_utf8(bytes).map_err(|error| format!("FFI request is not UTF-8: {error}"))?;
  let data = cirru_edn::parse(source).map_err(|error| format!("FFI request is not valid Cirru EDN: {error}"))?;
  let Edn::List(EdnListView(args)) = data else {
    return Err("FFI request must be a Cirru EDN list".to_owned());
  };
  Ok(args)
}

pub fn encode_edn(value: &Edn) -> Result<Vec<u8>, String> {
  cirru_edn::format(value, true)
    .map(String::into_bytes)
    .map_err(|error| format!("failed to encode Cirru EDN: {error}"))
}

pub fn encode_callback_args(values: Vec<Edn>) -> Result<Vec<u8>, String> {
  encode_edn(&Edn::List(EdnListView(values)))
}

pub fn encode_failure(message: impl Into<String>) -> Vec<u8> {
  encode_edn(&Edn::str(message.into())).unwrap_or_else(|_| b"|failed-to-encode-wss-error".to_vec())
}

pub unsafe fn write_output(output: *mut CalcitFfiBuffer, bytes: Vec<u8>) -> i32 {
  if output.is_null() {
    return 1;
  }
  let mut bytes = std::mem::ManuallyDrop::new(bytes);
  let buffer = CalcitFfiBuffer {
    ptr: bytes.as_mut_ptr(),
    len: bytes.len(),
    cap: bytes.capacity(),
  };
  // SAFETY: the caller supplied a writable output slot for this call.
  unsafe { output.write(buffer) };
  0
}

pub unsafe fn run_buffer_adapter(
  request_ptr: *const u8,
  request_len: usize,
  output: *mut CalcitFfiBuffer,
  method: impl FnOnce(Vec<Edn>) -> Result<Edn, String>,
) -> i32 {
  match catch_unwind(AssertUnwindSafe(|| {
    // SAFETY: forwarded from the exported buffer ABI contract.
    let args = unsafe { decode_request(request_ptr, request_len) }?;
    method(args).and_then(|value| encode_edn(&value))
  })) {
    Ok(Ok(bytes)) => unsafe { write_output(output, bytes) },
    Ok(Err(error)) => {
      let _ = unsafe { write_output(output, error.into_bytes()) };
      1
    }
    Err(_) => {
      let _ = unsafe { write_output(output, b"WebSocket FFI adapter panicked".to_vec()) };
      1
    }
  }
}

pub fn enqueue_with_backpressure(host: CalcitFfiAsyncHostV1, task: CalcitFfiAsyncTaskV1, kind: u32, payload: &[u8]) -> i32 {
  let Some(enqueue) = host.enqueue else {
    return ASYNC_STATUS_INVALID_PAYLOAD;
  };
  loop {
    let status = unsafe { enqueue(host.context, task.handle, kind, 0, payload.as_ptr(), payload.len()) };
    if status != ASYNC_STATUS_QUEUE_FULL {
      return status;
    }
    sleep(Duration::from_millis(1));
  }
}
