import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';

import { DatabaseModule } from './database/database.module';

@Module({
	imports: [DatabaseModule, ConfigModule.forRoot(), UserModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
