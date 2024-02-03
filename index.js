const config = require("./config/log_config");
const { Logger, LogConfig } = require("./lib/logtar");

const logConfig = LogConfig.from_file("./config/log_config.json");
console.log(config);

const logger = Logger.with_config(logConfig);
console.log(logger);
