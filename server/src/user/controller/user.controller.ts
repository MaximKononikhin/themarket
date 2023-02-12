import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Put,
} from '@nestjs/common';

import UserEntity from '@shared/entities/user.entity';
import { UserService } from '@user/service/user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findById(id);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Delete(':id')
	deleteOne(@Param('id', ParseIntPipe) id: number) {
		return this.userService.deleteOne(id);
	}

	@Put(':id')
	updateOne(@Param('id', ParseIntPipe) id: number, @Body() user: UserEntity) {
		return this.userService.updateOne(id, user);
	}
}
