const fs = require("node:fs/promises");

// This function asynchronously opens a file, reads it line by line
// and logs each line on the console.
async function read_file() {
  try {
    const file_handle = await fs.open(
      "./log_config.json",
      "r",
      fs.constants.O_RDONLY
    );

    let stream = file_handle.readLines({
      // start reading from the beginning of the file.
      start: 0,

      // read till the end of the file.
      end: Infinity,

      // specify the encoding to be utf8, or else the stream
      // will emit buffer objects instead of strings.
      encoding: "utf8",

      /**
       * If autoClose is false, then the file descriptor won't be closed,
       * even if there's an error. It is the application's responsibility
       * to close it and make sure there's no file descriptor leak. If
       * autoClose is set to true (default behavior), on 'error' or 'end' the
       * file descriptor will be closed automatically.
       */
      autoClose: true,

      /**
       * If emitClose is true, then the `close` event will be emitted
       * after reading is finished. Default is `true`.
       */
      emitClose: true,
    });

    // The 'close' event is emitted when the file_handle has been closed
    // and can no longer be used.
    stream.on("close", () => {
      console.log("File handle %d closed", file_handle.fd);
    });

    // The 'line' event be fired whenever a line is read from the file.
    stream.on("line", (line) => {
      console.log("Getting line -> %s", line);
    });
  } catch (err) {
    // If there's any error during the try {} block, it will log an error
    // Since autoClose === true, the file descriptor will be closed when this happens
    console.error("Error occurred while reading file: %o", err);
  }
}

read_file();

module.exports = read_file;
