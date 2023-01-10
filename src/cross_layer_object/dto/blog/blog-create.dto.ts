import { Length, IsString, IsIn } from "class-validator";

export class BlogCreateDTO {
    @IsString()
    @Length(4, 35)
    title: string;

    @IsString()
    @Length(8, 1000)
    content: string;
}
