import { Length, IsString, IsIn, IsNumber } from "class-validator";

export class CountryCreateDTO {
    @IsString()
    @Length(4, 50)
    name: string;

    @IsString()
    @Length(0, 50)
    code: string;
}
