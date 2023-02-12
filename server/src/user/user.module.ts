import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserEntity from '@shared/entities/user.entity';
import { FileModule } from '@file/file.module';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), FileModule],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
