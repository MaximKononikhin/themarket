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
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @Post("registration")
    @HttpCode(HttpStatus.OK)
    async registration (@Body() dto: RegisterUserDto, @Res({ passthrough: true }) res) {
        const {refresh_token, access_token} = await this.authService.register(dto);
        res.cookie("refreshToken", refresh_token, { httpOnly: true });
        res.cookie("accessToken", access_token, { httpOnly: true });
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login (@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res) {
        const {refresh_token, access_token} = await this.authService.login(loginDto);
        res.cookie("refreshToken", refresh_token, { httpOnly: true });
        res.cookie("accessToken", access_token, { httpOnly: true });
    }

    @Post("logout")
    @UseGuards(JwtAuthGuard)
    logout(@Res({ passthrough: true }) res) {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@GetCurrentUserData() userInfo: JwtPayload) {
        return await this.userService.getUserById(userInfo.id);
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
       res.cookie("accessToken", access_token, { httpOnly: true });
    }
}
