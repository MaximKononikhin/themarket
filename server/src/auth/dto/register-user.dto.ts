import {IsEmail, IsString, Length} from "class-validator";

export class RegisterUserDto {
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @IsString({message: "Пароль должен быть строкой"})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;

    @IsString({message: "Имя должно быть строкой"})
    @Length(3, undefined, {message: 'Не меньше 3 символов'})
    readonly name: string
}