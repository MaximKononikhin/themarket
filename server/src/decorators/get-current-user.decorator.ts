import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {JwtPayload} from "../refresh-token/types/jwtPayload.type";
import {JwtPayloadWithRt} from "../refresh-token/types/jwtPayloadWithRt.type";

export const GetCurrentUserData = createParamDecorator(
    (data: keyof JwtPayloadWithRt, context: ExecutionContext): JwtPayload => {
        const request = context.switchToHttp().getRequest();
        if (!data) return request.user;
        return request.user[data];
    },
);