import { PostCreateDTO } from "@DTO/post/post-create.dto";
import { PostReadDTO } from "@DTO/post/post-read.dto";
import { PostUpdateDTO } from "@DTO/post/post-update.dto";

export interface IPostService {

    create: (postCreateDTO: PostCreateDTO) => Promise<number>;

    read: (id: number) => Promise<PostReadDTO>;

    update: (postUpdateDTO: PostUpdateDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

}
