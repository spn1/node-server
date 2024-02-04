const fs_sync = require("node:fs");
const path = require("path");

/**
 * Checks if a directory exists. If so, returns the directory path, if not, creates it an returns the path
 * @returns {fs_sync.PathLike} The path to the directory.
 */
function check_and_create_dir(path_to_dir) {
  const log_dir = path.resolve(require.main.path, path_to_dir);
  if (!fs_sync.existsSync(log_dir)) {
    fs_sync.mkdirSync(log_dir, { recursive: true });
  }

  return log_dir;
}

function get_caller_info() {
  const error = {};
  // Modifies the target object to include a stack trace
  Error.captureStackTrace(error);

  // Error.stack is 5 lines separated by \n
  // The last line gives us the line of the error, so we just want that
  const caller_frame = error.stack.split("\n")[4];

  // Remove 'at' which is a beginning of the line
  const meta_data = caller_frame.split("at ").pop();
  return meta_data;
}

module.exports = {
  check_and_create_dir,
  get_caller_info,
};
