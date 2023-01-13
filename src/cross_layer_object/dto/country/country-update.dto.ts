import { Length, IsString, IsOptional, IsNumber } from "class-validator";

export class CountryUpdateDTO {
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    @Length(4, 50)
    name: string;

    @IsOptional()
    @IsString()
    @Length(0, 50)
    code: string;
}
