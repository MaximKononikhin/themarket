import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Put,
	UseGuards,
} from '@nestjs/common';

import { GetUser } from '@shared/decorators/get-user.decorator';
import UserEntity from '@shared/entities/user.entity';
import { UserService } from '@user/service/user.service';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';

@Controller('user')
@UseGuards(CookieAuthenticationGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Put()
	async updateOne(@Body() user: UserEntity, @GetUser('id') id: number) {
		await this.userService.updateOne(id, user);
	}
}
