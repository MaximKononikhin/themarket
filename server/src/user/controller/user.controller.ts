import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import User from '@shared/entities/user.entity';
import { UserService } from '@user/service/user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() user: User): Observable<User> {
		return this.userService.create(user);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Observable<User> {
		return this.userService.findOne(id);
	}

	@Get()
	findAll(): Observable<User[]> {
		return this.userService.findAll();
	}

	@Delete(':id')
	deleteOne(@Param('id', ParseIntPipe) id: number): Observable<User> {
		return this.userService.deleteOne(id);
	}

	@Put(':id')
	updateOne(
		@Param('id', ParseIntPipe) id: number,
		@Body() user: User,
	): Observable<User> {
		return this.userService.updateOne(id, user);
	}
}
