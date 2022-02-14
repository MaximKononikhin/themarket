import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Request,
    Response,
    Res,
    UseGuards,
    UseInterceptors, UploadedFile
} from '@nestjs/common';
import {RegisterUserDto} from "./dto/register-user.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {LoginUserDto} from "./dto/login-user.dto";
import {RefreshJwtAuthGuard} from "./guards/refresh-jwt-auth.guard";
import {GetCurrentUserData} from "../decorators/get-current-user.decorator";
import {JwtPayloadWithRt} from "../refresh-token/types/jwtPayloadWithRt.type";
import {FileInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import { JwtPayload } from 'src/refresh-token/types/jwtPayload.type';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("registration")
    async registration (@Body() dto: RegisterUserDto) {
        const user = await this.authService.register(dto);
        return user;
    }

    @Post("login")
    async login (@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res) {
        const {refresh_token, access_token} = await this.authService.login(loginDto);
        res.cookie("refreshToken", refresh_token, { httpOnly: true });

        return {
            access_token
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@GetCurrentUserData() user: JwtPayload) {
        return user;
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
        @GetCurrentUserData() user: JwtPayloadWithRt,
        @Res({ passthrough: true }) res
    ) {
       const {refresh_token, access_token} = await this.authService.refreshTokens(user.id, user.refreshToken);
       res.cookie("refreshToken", refresh_token, { httpOnly: true });

       return {
           access_token
       }
    }


}
