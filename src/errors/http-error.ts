import { HTTPStatus } from '../enums/http-status.enum';

// Костомный класс для выбрасывание HTTP ошибок
export class HTTPError extends Error {
    public code: number;
    public data: unknown;

    constructor(
        message: string,
        code: HTTPStatus = HTTPStatus.InternalServer,
        data: unknown = null
    ) {
        super(message);
        this.code = code;
        this.data = data;
    }
}
