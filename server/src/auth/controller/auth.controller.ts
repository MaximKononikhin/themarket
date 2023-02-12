import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBody,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

import { GetUser } from '@shared/decorators/get-user.decorator';
import { Logout } from '@shared/decorators/logout.decorator';
import UserEntity from '@shared/entities/user.entity';
import { User } from '@user/models/user.interface';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';
import { LogInWithCredentialsGuard } from '@auth/guards/login-with-credentials.guard';
import { CreateUserDto } from '@auth/models/dto/create-user.dto';
import { LoginUserDto } from '@auth/models/dto/login-user.dto';
import { AuthService } from '@auth/service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Пользователь с таким email уже существует',
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('signup')
	async signUp(@Body() dto: CreateUserDto) {
		await this.authService.signUp(dto);
	}

	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Неверный email или пароль',
	})
	@ApiBody({ type: LoginUserDto })
	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('signin')
	@UseGuards(LogInWithCredentialsGuard)
	async signIn() {
		return;
	}

	@ApiOperation({ summary: 'Получения пользователя' })
	@ApiOkResponse({ type: UserEntity })
	@HttpCode(HttpStatus.OK)
	@UseGuards(CookieAuthenticationGuard)
	@Get()
	async authenticate(@GetUser() user: User) {
		return user;
	}

	@ApiOperation({ summary: 'Выход пользователя' })
	@ApiNoContentResponse()
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(CookieAuthenticationGuard)
	@Post('logout')
	async logOut(@Logout() logout: VoidFunction) {
		logout();
	}
}
