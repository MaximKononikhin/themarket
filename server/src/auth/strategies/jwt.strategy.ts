import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                const token = req?.cookies["accessToken"];
                if (!token) {
                    return null
                }
                return token;
            }]),
            ignoreExpiration: false,
            secretOrKey: process.env.PRIVATE_KEY,

        });
    }

    async validate(payload: any) {
        return { id: payload.id, email: payload.email };
    }
}