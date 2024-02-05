const path = require("node:path");
const { Logger, LogConfig } = require("./lib/logtar");

async function initialize_logger() {
  let logger = Logger.with_config(
    LogConfig.from_file(path.join(__dirname, "config", "logger.json"))
  );
  await logger.init();

  return logger;
}

async function main() {
  let logger = await initialize_logger();
  setInterval(() => {
    logger.critical("From the main() function");
  }, 20);
}

main();
