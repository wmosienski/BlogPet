import { IsEmail, Length, IsString } from "class-validator";

export class UserRegisterDTO {
    @IsEmail()
    @Length(2, 35)
    email: string;

    @IsString()
    @Length(8, 500)
    password: string;
}
