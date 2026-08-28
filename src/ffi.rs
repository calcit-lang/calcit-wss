pub use calcit_native_ffi::{CalcitFfiAsyncHostV1, CalcitFfiAsyncTaskV1, decode_request, encode_callback_args, encode_failure};

pub const ASYNC_STATUS_OK: i32 = calcit_native_ffi::status::OK;
pub const ASYNC_STATUS_HANDLE_CLOSING: i32 = calcit_native_ffi::status::HANDLE_CLOSING;
pub const ASYNC_STATUS_HANDLE_FINISHED: i32 = calcit_native_ffi::status::HANDLE_FINISHED;
pub const ASYNC_STATUS_INVALID_PAYLOAD: i32 = calcit_native_ffi::status::INVALID_PAYLOAD;
pub const ASYNC_STATUS_INTERNAL_ERROR: i32 = calcit_native_ffi::status::INTERNAL_ERROR;
pub const ASYNC_TASK_ONE_SHOT: u32 = calcit_native_ffi::task_kind::ONE_SHOT;
pub const ASYNC_TASK_SERVER: u32 = calcit_native_ffi::task_kind::SERVER;
pub const ASYNC_TASK_SERIAL_EVENTS: u32 = calcit_native_ffi::task_flags::SERIAL_EVENTS;
pub const ASYNC_EVENT_EMIT: u32 = calcit_native_ffi::event_kind::EMIT;
pub const ASYNC_EVENT_COMPLETE: u32 = calcit_native_ffi::event_kind::COMPLETE;
pub const ASYNC_EVENT_FAIL: u32 = calcit_native_ffi::event_kind::FAIL;

pub unsafe fn copy_task_descriptor(value: *const CalcitFfiAsyncTaskV1) -> Result<CalcitFfiAsyncTaskV1, i32> {
  // SAFETY: forwarded from the exported versioned descriptor contract.
  unsafe { calcit_native_ffi::copy_task_descriptor(value) }.map_err(|_| ASYNC_STATUS_INVALID_PAYLOAD)
}

pub unsafe fn copy_host_descriptor(value: *const CalcitFfiAsyncHostV1) -> Result<CalcitFfiAsyncHostV1, i32> {
  // SAFETY: forwarded from the exported versioned descriptor contract.
  unsafe { calcit_native_ffi::copy_async_host(value) }.map_err(|_| ASYNC_STATUS_INVALID_PAYLOAD)
}

pub fn enqueue_with_backpressure(host: CalcitFfiAsyncHostV1, task: CalcitFfiAsyncTaskV1, kind: u32, payload: &[u8]) -> i32 {
  calcit_native_ffi::enqueue_with_backpressure(host, task, kind, 0, payload, calcit_native_ffi::BackpressurePolicy::default())
}

pub fn enqueue_with_backpressure_until<F>(
  host: CalcitFfiAsyncHostV1,
  task: CalcitFfiAsyncTaskV1,
  kind: u32,
  payload: &[u8],
  should_continue: F,
) -> i32
where
  F: FnMut() -> bool,
{
  calcit_native_ffi::enqueue_with_backpressure_until(
    host,
    task,
    kind,
    0,
    payload,
    calcit_native_ffi::BackpressurePolicy::default(),
    should_continue,
  )
}
