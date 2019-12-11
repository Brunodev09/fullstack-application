const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.colorize(),
    defaultMeta: {},
    transports: [
    ]
});

logger.add(new winston.transports.Console({
    format: winston.format.simple()
}));

module.exports = logger;