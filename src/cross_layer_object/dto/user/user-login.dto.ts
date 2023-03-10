import { IsEmail, Length, IsString } from "class-validator";

export class UserLoginDTO {
    @IsEmail()
    @Length(2, 15)
    email: string;

    @IsString()
    @Length(8, 500)
    password: string;
}
