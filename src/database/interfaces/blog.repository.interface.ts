import { BlogDBO } from "@DBO/blog.dbo";

export interface IBlogRepository {
    create(blogDBO: BlogDBO): Promise<undefined | number>;
    read(id: number): Promise<BlogDBO | null>;
    update(blogDBO: BlogDBO): Promise<void>;
    delete(id: number): Promise<void>;
}