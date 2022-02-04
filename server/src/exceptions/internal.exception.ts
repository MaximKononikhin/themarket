import {HttpException, HttpStatus} from "@nestjs/common";

export class InternalException extends HttpException {
    constructor(message = "Внутренняя ошибка сервера") {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}