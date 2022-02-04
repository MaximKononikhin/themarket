import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {RefreshTokenModule} from "../refresh-token/refresh-token.module";
import {RefreshJwtStrategy} from "./strategies/refresh-jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({}),
        RefreshTokenModule
    ],
    providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
