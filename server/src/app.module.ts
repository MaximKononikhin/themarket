import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { resolve } from 'path';

import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from '@file/file.module';

import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		DatabaseModule,
		ConfigModule.forRoot(),
		UserModule,
		AuthModule,
		FileModule,
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, 'static'),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
