const Transport = require('winston-transport');
const ezylogs = require('ezylogs');

module.exports = class LogzioWinstonTransport extends Transport {
    constructor(options) {
        super(options);
        ezylogs.config({
            apiKey: options.apiKey,
            system: options.system || 'ezyLogs System'
        });
        this.ezylogsLogger = ezylogs;
    }

    log(info, callback) {
        const allowedLevels = [
            'debug',
            'error',
            'info',
            'log',
            'warn',
            'trace'
        ];

        if (!allowedLevels.includes(info.level)) {
            info.level = 'log';
        }

        let msg = info.message;

        const splat = info[Symbol.for('splat')];
        let err = splat && splat[0];
        if (err instanceof Error) {
            msg = err.stack || err.toString()
        }

        this.ezylogsLogger[info.level](msg);
        callback(null, true);
    }

    finish(callback) {
        this.ezylogsLogger.sendAndClose(callback);
    }
};