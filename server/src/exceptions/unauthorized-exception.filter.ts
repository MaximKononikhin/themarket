import {ExceptionFilter, Catch, ArgumentsHost, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                message: "Пользователь не авторизован",
                statusCode: status,
            });
    }
}