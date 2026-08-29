# Keep the slow peer connected through server cancellation

The real slow-reader regression now keeps the client socket alive until the server worker exits through its own write-timeout and cancellation path. It also verifies the cumulative `server-cancelled` metric increments exactly once while `write-failed` remains unchanged, preventing a peer disconnect from masking cleanup behavior.
