import { Length, IsString } from "class-validator";

export class UserRefreshDTO {
    @IsString()
    @Length(2, 150)
    refreshToken: string;
}
