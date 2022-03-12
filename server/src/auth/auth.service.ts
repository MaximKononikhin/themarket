import {ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import {UserService} from "../user/user.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {RefreshTokenService} from "../refresh-token/refresh-token.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: RefreshTokenService,
    ) {
    }

    async register(registerUserDto: RegisterUserDto) {
        const candidate = await this.userService.getUserByEmail(registerUserDto.email);

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
        const {email, id} = await this.userService.createUser({...registerUserDto, password: hashPassword});

        const tokens = await this.tokenService.getTokens(id, email);

        return tokens;
    }

    async validate (loginUserDto: LoginUserDto) {

        const user = await this.userService.getUserByEmail(loginUserDto.email);

        if (!user) {
            throw new UnauthorizedException({message: 'Неверный email или пароль'})
        }

        const isPasswordEquals = await bcrypt.compare(loginUserDto.password, user.password);

        if (user && isPasswordEquals) {
            const {password, ...result} = user;
            return result;
        }

        throw new HttpException("Неверный email или пароль", HttpStatus.BAD_REQUEST)
    }

    async login (loginUserDto: LoginUserDto) {
        const user = await this.validate(loginUserDto);
        const tokens = await this.tokenService.getTokens(user.id, user.email);
        await this.tokenService.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException("Пользователя с таким id не существует", HttpStatus.BAD_REQUEST);
        }

        const isTokenValid = this.tokenService.validateRefreshToken(refreshToken);
        if (!isTokenValid) {
            throw new ForbiddenException("Токен не валиден");
        }

        const tokens = await this.tokenService.getTokens(userId, user.email);
        await this.tokenService.updateRefreshToken(userId, tokens.refresh_token);

        return tokens;
    }
}
