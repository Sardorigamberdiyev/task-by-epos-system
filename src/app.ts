import type { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';

import { IConfigService } from './config/config.service.interface';
import { IDatabaseService } from './database/database.service.interface';
import { ILoggerService } from './logger/logger.service.interface';
import { PersonModelDefine } from './persons/person.model-define';
import { BaseController } from './common/base.controller';
import { ExceptionFilterServer } from './errors/exception.filter.service';
import { IExceptionFilter } from './errors/exception.filter.interface';

export class App {
    private app: Express;

    constructor(
        private readonly logger: ILoggerService,
        private readonly configService: IConfigService,
        private readonly databaseService: IDatabaseService,
        private readonly controllers: BaseController[]
    ) {
        this.app = express();
    }

    private useGlobalMiddlewares() {
        this.app.use(cors());
        this.app.use(json());
    }

    private useRoutes() {
        for (const controller of this.controllers) {
            this.app.use('/api/', controller.router);
        }
    }

    private useException(exceptionFilters: IExceptionFilter[]) {
        for (const exceptionFilter of exceptionFilters) {
            this.app.use(exceptionFilter.catch.bind(exceptionFilter));
        }
    }

    private listenPort() {
        const PORT = this.configService.get('PORT');

        this.app.listen(PORT, () =>
            this.logger.info(`Сервер запустился на порте ${PORT}`)
        );
    }

    public async init() {
        await this.databaseService.init([new PersonModelDefine()]);

        this.useGlobalMiddlewares();
        this.useRoutes();
        this.useException([new ExceptionFilterServer(this.logger)]);
        this.listenPort();
    }
}
