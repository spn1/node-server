const {
  RollingSizeOptions,
  RollingTimeOptions,
} = require("../utils/rolling-options");

/**
 * Configuration for rolling log files (time and size)
 */
class RollingConfig {
  /**
   * Roll/Create new file every time the current log session exceeds this threshold in `seconds`.
   * @type {RollingTimeOptions}
   * @private
   */
  #time_threshold = RollingTimeOptions.Hourly;

  /**
   * Roll/Create new file every time the current file size exceeds this threshold.
   * @type {RollingSizeOptions}
   * @private
   */
  #size_threshold = RollingSizeOptions.FiveMB;

  /**
   * Getter for #time_threshold
   */
  get time_threshold() {
    return this.#time_threshold;
  }

  /**
   * Getter for #size_threshold
   */
  get size_threshold() {
    return this.#size_threshold;
  }

  /**
   * Checks that the provided config is valid, throws an error if not.
   * @param {RollingConfig} rolling_config The value that is being checked for validity
   */
  static assert(rolling_config) {
    if (!(rolling_config instanceof RollingConfig)) {
      throw new Error(
        `rolling_config must be an instance of RollingConfig. Unsupported param ${JSON.stringify(
          rolling_config
        )}`
      );
    }
  }

  /**
   * Returns RollingConfig object with default settings.
   * @returns {RollingConfig} RollingConfig object with refault settings
   */
  static with_defaults() {
    return new RollingConfig();
  }

  /**
   * Sets the objects size_threshold to the provided value, throws an error if not valid.
   * @param {RollingSizeOptions} size_threshold
   * @returns The resulting object RollingConfig object with then new size_threshold value.
   */
  with_size_threshold(size_threshold) {
    RollingSizeOptions.assert(size_threshold);
    this.#size_threshold = size_threshold;
    return this;
  }

  /**
   * Sets the objects time_threshold to the provided value, throws an error if not valid.
   * @param {RollingTimeOptions} time_threshold
   * @returns The resulting object RollingConfig object with then new time_threshold value.
   */
  with_time_threshold(time_threshold) {
    RollingTimeOptions.assert(time_threshold);
    this.#time_threshold = time_threshold;
    return this;
  }

  /**
   * Creates a RollingConfig instance with json configuration.
   * @param {object} json that defines the configuration of the object
   * @returns {RollingConfig} A new RollingConfig object with the provided json config.
   */
  static from_json(json) {
    let rolling_config = new RollingConfig();

    Object.keys(json).forEach((key) => {
      switch (key) {
        case "size_threshold":
          rolling_config = rolling_config.with_size_threshold(json[key]);
          break;
        case "time_threshold":
          rolling_config = rolling_config.with_time_threshold(json[key]);
          break;
      }
    });

    return rolling_config;
  }
}

module.exports = { RollingConfig };
