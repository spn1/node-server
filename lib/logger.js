const { LogConfig } = require("./config/log-config");
const { LogLevel } = require("./utils/log-level");

/**
 * Handles logging data that is passed to it
 */
class Logger {
  /**
   * @type {LogConfig}
   */
  #config;

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

  #log(message, log_level) {
    console.log("%s: %s", message, LogLevel.to_string(log_level));
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
