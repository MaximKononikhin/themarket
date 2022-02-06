import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RefreshTokenEntity} from "../entities/refresh-token.entity";

@Module({
  imports: [
      JwtModule.register({}),
      TypeOrmModule.forFeature([
          RefreshTokenEntity
      ])
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
