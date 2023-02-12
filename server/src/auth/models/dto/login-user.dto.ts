import { IsEmail, MaxLength, MinLength } from 'class-validator';

import {
	INVALID_EMAIL,
	TOO_LONG_PASSWORD,
	TOO_SHORT_PASSWORD,
} from '@shared/constants/constraints';

export class LoginUserDto {
	@IsEmail(undefined, { message: INVALID_EMAIL })
	email: string;

	@MinLength(8, { message: TOO_SHORT_PASSWORD })
	@MaxLength(20, { message: TOO_LONG_PASSWORD })
	password: string;
}
