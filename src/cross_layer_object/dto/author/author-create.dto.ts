import { Length, IsString, IsIn, IsNumber } from "class-validator";

export class AuthorCreateDTO {
    @IsNumber()
    userId: number;

    @IsNumber()
    countryId: number;

    @IsString()
    @Length(4, 50)
    firstname: string;

    @IsString()
    @Length(4, 50)
    lastname: string;
}
