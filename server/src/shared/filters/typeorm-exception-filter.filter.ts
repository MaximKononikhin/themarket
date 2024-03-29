import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common';

import {
	CannotCreateEntityIdMapError,
	EntityNotFoundError,
	QueryFailedError,
} from 'typeorm';

@Catch()
export class TypeOrmExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest<Request>();
		let message = (exception as any).message.message;
		let code = 'HttpException';

		let status = HttpStatus.INTERNAL_SERVER_ERROR;

		switch (exception.constructor) {
			case QueryFailedError:
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as QueryFailedError).message;
				code = (exception as any).code;
				break;
			case EntityNotFoundError:
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as EntityNotFoundError).message;
				code = (exception as any).code;
				break;
			case CannotCreateEntityIdMapError:
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as CannotCreateEntityIdMapError).message;
				code = (exception as any).code;
				break;
		}

		if (
			exception.constructor === QueryFailedError ||
			exception.constructor === EntityNotFoundError ||
			exception.constructor === CannotCreateEntityIdMapError
		) {
			response
				.status(status)
				.json(GlobalResponseError(status, message, code, request));
		}
	}
}

const GlobalResponseError: (
	statusCode: number,
	message: string,
	code: string,
	request: Request,
) => IResponseError = (
	statusCode: number,
	message: string,
	code: string,
	request: Request,
): IResponseError => {
	return {
		statusCode: statusCode,
		message,
		code,
		timestamp: new Date().toISOString(),
		path: request.url,
		method: request.method,
	};
};

export interface IResponseError {
	statusCode: number;
	message: string;
	code: string;
	timestamp: string;
	path: string;
	method: string;
}
