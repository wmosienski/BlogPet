import { IBlogRepository } from "@Database/interfaces/blog.repository.interface";
import { BlogDBO } from "@DBO/blog.dbo";
import { injectable } from "inversify";

@injectable()
export class BlogRepository implements IBlogRepository {
    async create(blogDBO: BlogDBO): Promise<void> {
        throw 'not implemented';
    }    
}