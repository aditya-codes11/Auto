import winston from 'winston';
import fs from 'fs';

const logDirectory = 'logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const Logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.simple()
  ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: 'logs/automation.log'
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  ]
});

export default Logger;