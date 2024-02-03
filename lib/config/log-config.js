fs = require("node:fs");

const { LogLevel } = require("../utils/log-level");
const { RollingConfig } = require("./rolling-config");

/**
 * Defines the configuration for a Logging object
 */
class LogConfig {
  /**
   * @type {LogLevel}
   * @private
   * @description The log level to be used
   */
  #level = LogLevel.Debug;

  /**
   * @type {RollingConfig}
   * @private
   */
  #rolling_config = RollingConfig.Hourly;

  /**
   * @type {string}
   * @private
   * @description The prefix to be used for the log file names
   */
  #file_prefix = "Logtar_";

  get level() {
    return this.#level;
  }

  get rolling_config() {
    return this.#rolling_config;
  }

  get file_prefix() {
    return this.#file_prefix;
  }

  constructor() {
    this.#rolling_config = RollingConfig.with_defaults();
  }

  /**
   * @param {LogConfig} log_config The log config to be validated.
   * @throws {Error} If the log_config is not an instance of LogConfig.
   */
  static assert(log_config) {
    if (arguments.length > 0 && !(log_config instanceof LogConfig)) {
      throw new Error(
        `log_config must be an instance of LogConfig. Unsupported param ${JSON.stringify(
          log_config
        )}`
      );
    }
  }

  /**
   * @returns {LogConfig} A new instance of LogConfig with default values.
   */
  static with_defaults() {
    return new LogConfig();
  }

  /**
   * @param {LogLevel} log_level The log level to be set.
   * @returns {LogConfig} The current instance of LogConfig.
   */
  with_log_level(log_level) {
    LogLevel.assert(log_level);
    this.#level = log_level;
    return this;
  }

  /**
   * Create a LoggingConfig instance with the provided config
   * @param {Object} config The RollingConfig settings
   * @returns A new LoggingConfig object with the provided config
   */
  with_rolling_config(config) {
    this.#rolling_config = RollingConfig.from_json(config);
    return this;
  }

  /**
   * Sets the file_prefix variable for this LoggingConfig object
   * @param {string} file_prefix The file prefix to be set.
   * @returns {LogConfig} The current instance of LogConfig.
   * @throws {Error} If the file_prefix is not a string.
   */
  with_file_prefix(file_prefix) {
    if (typeof file_prefix !== "string") {
      throw new Error(
        `file_prefix must be a string. Unsupported param ${JSON.stringify(
          file_prefix
        )}`
      );
    }

    this.#file_prefix = file_prefix;
    return this;
  }

  /**
   * Creates a LogingConfig instance with json configuration.
   * @param {object} json that defines the configuration of the object
   * @returns {LoggingConfig} A new LogingConfig object with the provided json config.
   */
  static from_json(json) {
    let log_config = new LogConfig();

    Object.keys(json).forEach((key) => {
      switch (key) {
        case "level":
          log_config = log_config.with_log_level(json[key]);
          break;
        case "rolling_config":
          log_config = log_config.with_rolling_config(json[key]);
          break;
        case "file_prefix":
          log_config = log_config.with_file_prefix(json[key]);
          break;
      }
    });

    return log_config;
  }

  /**
   * @param {string} file_path The path to the config file.
   * @returns {LogConfig} A new instance of LogConfig with values from the config file.
   * @throws {Error} If the file_path is not a string.
   */
  static from_file(file_path) {
    // File is read synchronously so that we are 100% sure the configuration is loaded before doing anything else.
    const file_contents = fs.readFileSync(file_path);

    return LogConfig.from_json(JSON.parse(file_contents));
  }
}

module.exports = { LogConfig };