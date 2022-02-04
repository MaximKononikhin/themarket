import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import {User} from "./user/user.entity";
import {Role} from "./role/role.entity";
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import {RefreshTokenEntity} from "./refresh-token/refresh-token.entity";
import { FileModule } from './file/file.module';
import File from "./file/file.entity";

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, RefreshTokenEntity, File],
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    RefreshTokenModule,
    FileModule,
  ]
})
export class AppModule {}
