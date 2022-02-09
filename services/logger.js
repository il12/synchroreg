import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'verbose',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'your-service-name' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        new transports.File({ filename: 'synchroreg-error.log', level: 'error' }),
        new transports.File({ filename: 'synchroreg-combined.log' })
    ]
});

export default logger;
