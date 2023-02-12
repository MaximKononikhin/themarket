import { BadRequestException, Injectable } from '@nestjs/common';

import { compare, hash } from 'bcrypt';

import { UserService } from '@user/service/user.service';
import { AuthDto } from '@auth/models/dto/auth.dto';
import { CreateUserDto } from '@auth/models/dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async signUp(createUserDto: CreateUserDto) {
		const isUserExist = await this.userService.findByEmail(
			createUserDto.email,
		);
		if (isUserExist) {
			throw new BadRequestException(
				'Пользователь с таким email уже существует',
			);
		}
		const passwordHash = await hash(createUserDto.password, 11);

		await this.userService.create({
			...createUserDto,
			password: passwordHash,
		});
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userService.findByEmail(dto.email);

		if (user) {
			const isPasswordMatch = await compare(dto.password, user.password);

			if (isPasswordMatch) {
				return user;
			}
		}

		return null;
	}
}
