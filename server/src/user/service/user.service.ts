import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import UserEntity from '@shared/entities/user.entity';
import { User } from '@user/models/user.interface';
import { CreateUserDto } from '@auth/models/dto/create-user.dto';
import { FileService } from '@file/service/file.service';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		private readonly fileService: FileService,
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

	async uploadAvatar(id: number, avatar: Express.Multer.File) {
		const fileName = await this.fileService.createFile(avatar);
		await this.userRepository.update(id, { avatar: fileName });
	}

	async deleteAvatar(id: number) {
		const user = await this.findById(id);

		if (!user.avatar) {
			throw new BadRequestException('У пользователя нет аватара');
		}

		await this.fileService.deleteFile(user.avatar);
		await this.updateOne(id, { ...user, avatar: null });
	}
}
