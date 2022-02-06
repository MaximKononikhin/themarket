import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshTokenEntity} from "../entities/refresh-token.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {Tokens} from "./types/tokens.type";
import {JwtPayload} from "./types/jwtPayload.type";

@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectRepository(RefreshTokenEntity) private refreshTokenRepository: Repository<RefreshTokenEntity>,
        private jwtService: JwtService,
    ) {}

    async updateRefreshToken(userId: number, refreshToken: string) {
        const tokenData = await this.refreshTokenRepository.findOne({where: {userId}});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await this.refreshTokenRepository.save(tokenData);
            return;
        }
        const token = await this.refreshTokenRepository.create({userId, refreshToken});
        await this.refreshTokenRepository.save(token);
    }

    async validateRefreshToken (token: string) {
        const isValid = await this.jwtService.verifyAsync(token, {
            secret: process.env.REFRESH_PRIVATE_KEY,
        })
        return isValid;
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            id: userId,
            email: email,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.PRIVATE_KEY,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_PRIVATE_KEY,
                expiresIn: '30d',
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }
}
