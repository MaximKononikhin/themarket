

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import {JwtPayload} from "../../refresh-token/types/jwtPayload.type";
import {JwtPayloadWithRt} from "../../refresh-token/types/jwtPayloadWithRt.type";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                return req.cookies["refreshToken"]
            },
            secretOrKey: process.env.REFRESH_PRIVATE_KEY,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req.cookies["refreshToken"];

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refreshToken,
        };
    }
}