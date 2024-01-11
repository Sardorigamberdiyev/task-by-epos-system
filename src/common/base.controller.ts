import { Router, Request, Response, NextFunction } from 'express';
import { IRoute } from './route.interface';
import { ILoggerService } from '../logger/logger.service.interface';
import { HTTPStatus } from '../enums/http-status.enum';

export abstract class BaseController {
    private _router: Router;

    constructor(protected readonly logger: ILoggerService) {
        this._router = Router();
    }

    public get router(): Router {
        return this._router;
    }

    protected ok(res: Response, data: unknown) {
        this.send(res, HTTPStatus.OK, data);
    }

    protected created(res: Response, data: unknown) {
        this.send(res, HTTPStatus.Created, data);
    }

    protected send(res: Response, status: HTTPStatus, data: unknown) {
        res.status(status).json(data);
    }

    protected attachControllers(routes: IRoute[]) {
        for (const route of routes) {
            const { method, path, description, middlewares, controller } = route;
            const middlewaresExecute = middlewares?.map((m) => m.execute.bind(m)) || [];
            // Логируем роутов
            this.logger.info(
                `[${method.toUpperCase()}]: ${path} (${description || ''} | ПО: ${middlewaresExecute.length})`
            );
            // Регестрируем контроллеров
            this._router[method](
                path,
                middlewaresExecute,
                this.catchHandler(controller.bind(this))
            );
        }
    }

    private catchHandler(controller: IRoute['controller']) {
        // Обвёртка контроллеров для обработки ошибок (для избежание дублирование try catch)
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await controller(req, res, next);
            } catch (e) {
                next(e);
            }
        };
    }
}
