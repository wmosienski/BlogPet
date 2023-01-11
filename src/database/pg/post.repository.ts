import { IPostRepository } from "@Database/interfaces/post.repository.interface";
import { PostDBO } from "@DBO/post.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures"

@injectable()
export class PostRepository implements IPostRepository {
    async create(postDBO: PostDBO): Promise<void> {
        return await pg().proc(procedures.post.create, [postDBO.blogId, postDBO.title, postDBO.text])
    }    
}