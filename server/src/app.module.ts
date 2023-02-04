import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [DatabaseModule, ConfigModule.forRoot(), UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
