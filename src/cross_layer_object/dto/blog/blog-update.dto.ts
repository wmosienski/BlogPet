import { Length, IsString, IsOptional, IsNumber } from "class-validator";

export class BlogUpdateDTO {
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    @Length(4, 50)
    title: string;

    @IsOptional()
    @IsString()
    @Length(0, 5000)
    description: string;
}
