import { IPostRepository } from "@Database/interfaces/post.repository.interface";
import { PostDBO } from "@DBO/post.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures";
import functions from "./functions";

@injectable()
export class PostRepository implements IPostRepository {
    async create(postDBO: PostDBO): Promise<undefined | number> {
        const result = await pg().func(functions.post.create, [postDBO.blogId, postDBO.title, postDBO.text]);

        return result.length && result[0]?.create_post || undefined;
    }

    async read(id: number): Promise<PostDBO | null> {
        const postDBOs: PostDBO[] = await pg().func(functions.post.read, [id]);

        return postDBOs.length ? postDBOs[0] : null
    } 

    async update(postDBO: PostDBO): Promise<void> {
        return await pg().proc(procedures.post.update, [postDBO.id, postDBO.title, postDBO.text])
    }
    
    async delete(id: number): Promise<void> {
        return await pg().proc(procedures.post.delete, [id])
    } 
}