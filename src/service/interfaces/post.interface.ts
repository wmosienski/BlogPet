import { PostCreateDTO } from "@DTO/post/post-create.dto";

export interface IPostService {

    create: (postCreateDTO: PostCreateDTO) => Promise<void>;

}
