class LogLevel {
  static #Debug = 0;
  static #Info = 1;
  static #Warn = 2;
  static #Error = 3;
  static #Critical = 4;

  static get Debug() {
    return this.#Debug;
  }

  static get Info() {
    return this.#Info;
  }

  static get Warn() {
    return this.#Warn;
  }

  static get Error() {
    return this.#Error;
  }

  static get Critical() {
    return this.#Critical;
  }

  /**
   * Asserts that the log level provided is valid.
   */
  static assert(log_level) {
    if (
      ![
        LogLevel.Debug,
        LogLevel.Info,
        LogLevel.Warn,
        LogLevel.Error,
        LogLevel.Critical,
      ].includes(log_level)
    ) {
      throw new Error(
        `log_level must be an instance of LogLevel. Unsupported param ${JSON.stringify(
          log_level
        )}`
      );
    }
  }

  /**
   *
   * @param {int} log_level Returns the string equivalent of the given log level
   * @returns {string} A string of the current log level
   * @throws {Error} If the log level is unsupported
   */
  static to_string(log_level) {
    const levelMap = {
      [this.Debug]: "DEBUG",
      [this.Info]: "INFO",
      [this.Warn]: "WARN",
      [this.Error]: "ERROR",
      [this.Critical]: "CRITICAL",
    };

    if (levelMap.hasOwnProperty(log_level)) {
      return levelMap[log_level];
    }

    throw new Error(`Unsupported log level ${log_level}`);
  }
}

module.exports = { LogLevel };
