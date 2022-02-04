import {HttpException, HttpStatus} from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor(message = "Ресурс не найден") {
        super(message, HttpStatus.NOT_FOUND);
    }
}