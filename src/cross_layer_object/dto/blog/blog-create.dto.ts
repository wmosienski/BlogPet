import { Length, IsString, IsIn, IsNumber } from "class-validator";

export class BlogCreateDTO {
    @IsString()
    @Length(4, 50)
    title: string;

    @IsString()
    @Length(0, 1000)
    description: string;

    @IsNumber()
    authorId: number;
}
