import { BlogDBO } from "@DBO/blog.dbo";

export interface IBlogRepository {
    create(user: BlogDBO): Promise<void>;
}