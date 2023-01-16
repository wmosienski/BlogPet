import { Length, IsString, IsIn, IsNumber } from "class-validator";

export class PostCreateDTO {
    @IsNumber()
    blogId: number;

    @IsString()
    @Length(4, 50)
    title: string;

    @IsString()
    @Length(0, 5000)
    text: string;


}
