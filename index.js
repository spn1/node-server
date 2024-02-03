const config = require("./config/log_config");
const { Logger, LogConfig } = require("./lib/logtar");

const logger = Logger.with_config(
  LogConfig.from_file("./config/log_config.json")
);

logger.debug("Refreshingly");
logger.info("Unconcerned");
logger.warn("With the Vulgar");
logger.error("Exigencies of");
logger.critical("Veracity");
