import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';

import { GetUser } from '@shared/decorators/get-user.decorator';
import { Logout } from '@shared/decorators/logout.decorator';
import { User } from '@user/models/user.interface';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';
import { LogInWithCredentialsGuard } from '@auth/guards/login-with-credentials.guard';
import { CreateUserDto } from '@auth/models/dto/create-user.dto';
import { AuthService } from '@auth/service/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('signup')
	async signUp(@Body() dto: CreateUserDto) {
		await this.authService.signUp(dto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('signin')
	@UseGuards(LogInWithCredentialsGuard)
	async signIn() {
		return;
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(CookieAuthenticationGuard)
	@Get()
	async authenticate(@GetUser() user: User) {
		return user;
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(CookieAuthenticationGuard)
	@Post('logout')
	async logOut(@Logout() logout: VoidFunction) {
		logout();
	}
}
