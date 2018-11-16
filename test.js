const winston = require('winston');

const {
  createLogger,
} = winston;
const EzylogsWinstonTransport = require('./lib/index');

const ezylogsWinstonTransport = new EzylogsWinstonTransport({
    system: 'logger',
    apiKey: '5bee72b0c5103230575564eb',
});
const logger = createLogger({
    transports: [ezylogsWinstonTransport],
});

const logMessage = 'Just a test message';
const errorMessage = 'Big problem';
const error = new Error(errorMessage);
logger.log('error', logMessage, error);
logger.log('error', logMessage);