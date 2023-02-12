import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@user/user.module';
import { AuthController } from '@auth/controller/auth.controller';
import { AuthService } from '@auth/service/auth.service';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { SessionSerializer } from '@auth/utils/session-serializer';

@Module({
	imports: [UserModule, ConfigModule, PassportModule],
	exports: [AuthService],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	controllers: [AuthController],
})
export class AuthModule {}
