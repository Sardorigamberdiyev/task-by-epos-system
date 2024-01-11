import { Logger, ILogObj } from 'tslog';
import { ILoggerService } from './logger.service.interface';

export class LoggerService implements ILoggerService {
    private logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({
            prettyLogTimeZone: 'local',
            prettyLogTemplate:
                '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{mm}} {{logLevelName}} ',
            hideLogPositionForProduction: true,
        });
    }

    warn(...msg: unknown[]): void {
        this.logger.warn(...msg);
    }

    error(...msg: unknown[]): void {
        this.logger.error(...msg);
    }

    info(...msg: unknown[]): void {
        this.logger.info(...msg);
    }

    fatal(...msg: unknown[]): void {
        this.logger.fatal(...msg);
    }

    debug(...arg: unknown[]): void {
        this.logger.debug(...arg);
    }
}
