import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";
import { BlogReadDTO } from "@DTO/blog/blog-read.dto";
import { BlogUpdateDTO } from "@DTO/blog/blog-update.dto";

export interface IBlogService {

    create: (blogCreateDTO: BlogCreateDTO) => Promise<number>;

    read: (id: number) => Promise<BlogReadDTO>;

    update: (blogUpdateDTO: BlogUpdateDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

}
