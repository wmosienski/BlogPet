import { IBlogRepository } from "@Database/interfaces/blog.repository.interface";
import { BlogDBO } from "@DBO/blog.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures";
import functions from "./functions";

@injectable()
export class BlogRepository implements IBlogRepository {
    async create(blogDBO: BlogDBO): Promise<undefined | number> {
        const result = await pg().func(functions.blog.create, [blogDBO.authorId, blogDBO.title, blogDBO.description]);

        return result.length && result[0]?.create_blog || undefined;
    }

    async read(id: number): Promise<BlogDBO | null> {
        const blogDBOs: BlogDBO[] = await pg().func(functions.blog.read, [id]);

        return blogDBOs.length ? blogDBOs[0] : null;
    }
    
    async update(blogDBO: BlogDBO): Promise<void> {
        return await pg().proc(procedures.blog.update, [blogDBO.id, blogDBO.title, blogDBO.description])
    }

    async delete(id: number): Promise<void> {
        return await pg().proc(procedures.blog.delete, [id])
    }
}