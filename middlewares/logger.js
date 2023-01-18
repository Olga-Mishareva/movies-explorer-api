const winston = require('winston');
const expressWinston = require('express-winston');
// const log4js = require('log4js');

// log4js.configure({
//   appenders: { myLog: { type: "file", filename: "myLog.log" } },
//   categories: { default: { appenders: ["myLog"], level: "error" } },
// });

// const logger = log4js.getLogger("myLog");
// logger.trace("Entering log testing");
// logger.debug("Got log.");
// logger.info("Log is here.");
// logger.warn("Warning!");
// logger.error("Error!");
// logger.fatal("Fatal!!!");


module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// module.exports.logger = expressWinston.logger({
//   transports: [
//     new winston.transports.Console(),
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json())
// });

