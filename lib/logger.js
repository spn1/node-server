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
    this.config = log_config;
  }
}

module.exports = {
  Logger,
};
