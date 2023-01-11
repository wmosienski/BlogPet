import { IBlogRepository } from "@Database/interfaces/blog.repository.interface";
import { BlogDBO } from "@DBO/blog.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures"

@injectable()
export class BlogRepository implements IBlogRepository {
    async create(blogDBO: BlogDBO): Promise<void> {
        return await pg().proc(procedures.blog.create, [blogDBO.authorId, blogDBO.title, blogDBO.description])
    }    
}