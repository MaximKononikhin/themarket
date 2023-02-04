import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserEntity from '@shared/entities/user.entity';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
