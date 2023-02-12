import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToInstance(metatype, value);
		const errors = await validate(object);

		if (errors.length > 0) {
			const errorMessage = errors
				.map((error) => {
					return Object.values(error.constraints);
				})
				.flat()
				.join(', ');

			const capitalizedMessage =
				errorMessage.slice(0, -1)[0].toUpperCase() +
				errorMessage.slice(1);

			throw new BadRequestException(capitalizedMessage);
		}
		return value;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private toValidate(metaType: Function): boolean {
		// eslint-disable-next-line @typescript-eslint/ban-types
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metaType);
	}
}
