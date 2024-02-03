const fs = require("node:fs/promises");
const path = require("path");

async function read_file(filename) {
  try {
    const log_path = path.join(__dirname, "config", filename);
    const stream = await (await fs.open(log_path)).readFile();
    const config = JSON.parse(stream);

    console.log("Log prefis is: %s", config.log_prefix);
  } catch (error) {
    console.error("Error: %o", error);
  }
}

read_file("log_config.json");

module.exports = { read_file };
