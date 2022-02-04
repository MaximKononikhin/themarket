import {IsEmail, IsString, Length} from "class-validator";

export class LoginUserDto {
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @IsString({message: "Пароль должен быть строкой"})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}