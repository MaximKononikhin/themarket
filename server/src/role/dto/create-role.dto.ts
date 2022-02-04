import {IsString, Length} from "class-validator";

export class CreateRoleDto {
    @IsString({message: "Должно быть строкой"})
    @Length(4, undefined, {message: "Минимальнная длинна 4 символа"})
    readonly value: string;


    @IsString({message: "Должно быть строкой"})
    @Length(4, undefined, {message: "Минимальнная длинна 4 символа"})
    readonly description: string;
}