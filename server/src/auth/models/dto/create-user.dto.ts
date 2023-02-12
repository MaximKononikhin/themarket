import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import {
	INVALID_EMAIL,
	INVALID_NAME_STRING,
	TOO_LONG_NAME,
	TOO_LONG_PASSWORD,
	TOO_SHORT_NAME,
	TOO_SHORT_PASSWORD,
} from '@shared/constants/constraints';

export class CreateUserDto {
	@IsString({ message: INVALID_NAME_STRING })
	@MinLength(4, { message: TOO_SHORT_NAME })
	@MaxLength(20, { message: TOO_LONG_NAME })
	name: string;

	@IsEmail(undefined, { message: INVALID_EMAIL })
	email: string;

	@MinLength(4, { message: TOO_SHORT_PASSWORD })
	@MaxLength(20, { message: TOO_LONG_PASSWORD })
	password: string;
}
