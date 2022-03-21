import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import {User} from "./entities/user.entity";
import {Role} from "./entities/role.entity";
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import {RefreshTokenEntity} from "./entities/refresh-token.entity";
import { Size } from "./entities/size.entity";
import { FileModule } from './file/file.module';
import File from "./entities/file.entity";
import {Gender} from "./entities/gender.entity";
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { Condition } from './entities/condition.entity';
import { Product } from './entities/product.entity';
import { S3Module } from './s3/s3.module';
import { ProductPhoto } from './entities/product-photo.entity';
import { DictionariesModule } from './dictionaries/dictionaries.module';

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
      entities: [
          User, Role, RefreshTokenEntity, File, Gender,
          Category, Subcategory, Size, Condition, Product, ProductPhoto
      ],
      synchronize: true,
    }),
      UserModule,
      RoleModule,
      AuthModule,
      RefreshTokenModule,
      FileModule,
      S3Module,
      DictionariesModule,
  ]
})
export class AppModule {}
