const config = require("./config/log_config");
const { Logger, LogConfig } = require("./lib/logtar");

const logger = Logger.with_config(
  LogConfig.from_file("./config/log_config.json")
);

console.log("Logger: ", logger);
console.log("Prefix: ", logger.file_prefix);
console.log("Level: ", logger.level);
console.log("Thresholds: ", logger.time_threshold, logger.size_threshold);
