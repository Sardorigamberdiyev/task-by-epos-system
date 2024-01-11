import { Request, Response, NextFunction } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { ILoggerService } from '../logger/logger.service.interface';
import { HTTPError } from './http-error';
import { HTTPStatus } from '../enums/http-status.enum';

// Класс для улавливание различных ошибок приложение
export class ExceptionFilterServer implements IExceptionFilter {
    constructor(private readonly logger: ILoggerService) {}

    catch(
        error: Error | HTTPError,
        req: Request,
        res: Response,
        _: NextFunction
    ) {
        const { message } = error;
        let statusCode = HTTPStatus.InternalServer;
        let data = null;

        if (error instanceof HTTPError) {
            statusCode = error.code;
            data = error.data;
        }

        this.logger.error(`[${statusCode}]: ${message}`);

        res.status(statusCode).json({
            message,
            data,
            code: statusCode,
        });
    }
}
