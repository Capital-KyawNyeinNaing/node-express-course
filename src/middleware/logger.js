const moment = require("moment");
const fs = require("fs");

const logger = (req, res, next) => {
  const logFile = fs.createWriteStream("debug.log", { flags: "a" });

  logFile.write(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }:${moment().format()}` + "\n"
  );
  next();
};

module.exports = logger;
