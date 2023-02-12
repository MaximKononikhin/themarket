import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from '@user/models/user.interface';
import { UserService } from '@user/service/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly userService: UserService) {
		super();
	}

	serializeUser(user: User, done: CallableFunction) {
		done(null, user);
	}

	async deserializeUser(user: User, done: CallableFunction) {
		const userDB = await this.userService.findById(user.id);
		return userDB ? done(null, userDB) : done(null, null);
	}
}
