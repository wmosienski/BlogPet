import { Length, IsString, IsNumber, IsOptional } from "class-validator";

export class AuthorUpdateDTO {
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    @Length(4, 50)
    firstname: string;

    @IsOptional()
    @IsString()
    @Length(4, 50)
    lastname: string;
}
