import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";

export interface IBlogService {

    create: (blogCreateDTO: BlogCreateDTO) => Promise<void>;

}
