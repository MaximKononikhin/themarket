import {Controller, Delete, HttpCode, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {UserService} from "./user.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {GetCurrentUserData} from "../decorators/get-current-user.decorator";
import {JwtPayload} from "../refresh-token/types/jwtPayload.type";
import { Express } from 'express'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseInterceptors(FileInterceptor('avatar'))
    @Post('avatar')
    @UseGuards(JwtAuthGuard)
    async addAvatar(@GetCurrentUserData() user: JwtPayload, @UploadedFile() file: Express.Multer.File) {
        return await this.userService.addAvatar(user.id, file.buffer, file.originalname);
    }

    @Delete('avatar')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async deleteAvatar(@GetCurrentUserData() user: JwtPayload) {
        await this.userService.deleteAvatar(user.id);
    }
}
