import { IsEmail, Length } from "class-validator";

export class UserLogoutDTO {
    @IsEmail()
    @Length(2, 15)
    email: string;
}
