import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { IMiddleware } from './middleware.interface';
import { HTTPError } from '../errors/http-error';
import { HTTPStatus } from '../enums/http-status.enum';

export class ValidateMiddleware implements IMiddleware {
    constructor(
        private classToValidate: ClassConstructor<object>,
        private isPlainQuery: boolean = false
    ) {}

    public async execute(
        { body, query }: Request,
        res: Response,
        next: NextFunction
    ) {
        const plain = this.isPlainQuery ? query : body;
        // Обычного объекта преобразуем в класс получаем инстанс этого класса с значениями
        const instance = plainToClass(this.classToValidate, plain);
        // Проверка на валидность данных
        const errors = await validate(instance);
        if (errors.length > 0) {
            // Если есть невалидные данные
            // То обрабатываем ошибки и сообшаем клиенту
            const errorsData = this.validationException(errors);
            next(
                new HTTPError(
                    'Вы не прошли валидацию',
                    HTTPStatus.Unprocessable,
                    errorsData
                )
            );
        } else {
            next();
        }
    }

    private validationException(errors: ValidationError[]): any {
        // Конструрирование ошибок валидаци более понятную JSON стуктуру
        return errors.reduce((prev, curr) => {
            // Проверяем на вложенность валидации
            return {
                [curr.property]: curr.children?.length // Если есть вложенные валидации данного поля
                    ? this.validationException(curr.children) // То конструрируем вложенные валидации
                    : curr.constraints, // Иначе возвашаем данные об ошибке
                ...prev,
            };
        }, {});
    }
}
