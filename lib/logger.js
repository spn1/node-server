const path = require("node:path");
const fs = require("node:fs/promises");
const { LogConfig } = require("./config/log-config");
const { LogLevel } = require("./utils/log-level");
const { check_and_create_dir } = require("./utils/helpers");

/**
 * Handles logging data that is passed to it
 */
class Logger {
  /**
   * @type {LogConfig}
   */
  #config;

  /**
   * @type {fs.FileHandle}
   */
  #log_file_handle;

  /**
   * @returns {LogLevel} The current log level.
   */
  get level() {
    return this.#config.level;
  }

  /**
   * @returns {string} The file prefix for the log files
   */
  get file_prefix() {
    return this.#config.file_prefix;
  }

  /**
   * @returns {int} The time threshold after which a new log file is created
   */
  get time_threshold() {
    return this.#config.rolling_config.time_threshold;
  }

  /**
   * @returns {int} The size threshold after which a new log file is created
   */
  get size_threshold() {
    return this.#config.rolling_config.size_threshold;
  }

  /**
   * Makes a new Logger with the default config
   * @returns {Logger} A new instance of Logger with default config.
   */
  static with_defaults() {
    return new Logger();
  }

  /**
   * Makes a new Logger with the specified config
   * @param {LogConfig} log_config The logging configuration
   * @returns {Logger} A new logging instance
   */
  static with_config(log_config) {
    return new Logger(log_config);
  }

  /**
   * @param {LogConfig} log_config The config configuration for the logger
   */
  constructor(log_config) {
    log_config = log_config || LogConfig.with_defaults();
    LogConfig.assert(log_config);
    this.#config = log_config;
  }

  async init() {
    const log_dir_path = check_and_create_dir("logs");

    const file_name =
      this.#config.file_prefix +
      new Date().toISOString().replace(/[\.:]+/g, "-") +
      ".log";
    this.#log_file_handle = await fs.open(path.join("logs", file_name), "a+");
  }

  async #log(message, log_level) {
    // #log_file_handle.fd is either 0 or -1, which is closed or not opened respectively
    if (log_level < this.#config.level || !this.#log_file_handle.fd) {
      return;
    }

    const log_message = `${LogLevel.to_string(log_level)}: ${message}`;
    console.log(log_message);
    await this.#log_file_handle.write(log_message);
  }

  debug(message) {
    this.#log(message, LogLevel.Debug);
  }

  info(message) {
    this.#log(message, LogLevel.Info);
  }

  warn(message) {
    this.#log(message, LogLevel.Warn);
  }

  error(message) {
    this.#log(message, LogLevel.Error);
  }

  critical(message) {
    this.#log(message, LogLevel.Critical);
  }
}

module.exports = {
  Logger,
};
