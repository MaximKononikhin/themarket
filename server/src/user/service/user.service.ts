import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import UserEntity from '@shared/entities/user.entity';
import { User } from '@user/models/user.interface';
import { CreateUserDto } from '@auth/models/dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async create(user: CreateUserDto) {
		return await this.userRepository.save(user);
	}

	async findById(id: number): Promise<UserEntity | null> {
		return await this.userRepository.findOne({ where: { id } });
	}

	async findAll() {
		return await this.userRepository.find();
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		return await this.userRepository.findOne({ where: { email } });
	}

	async deleteOne(id: number) {
		return await this.userRepository.delete(id);
	}

	async updateOne(id: number, user: User) {
		await this.userRepository.update(id, user);
	}
}
