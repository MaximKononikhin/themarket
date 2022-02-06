import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {RoleModule} from "../role/role.module";
import {FileModule} from "../file/file.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
      TypeOrmModule.forFeature([
          User
      ]),
      RoleModule,
      FileModule
  ],
    exports: [UserService]
})
export class UserModule {}
