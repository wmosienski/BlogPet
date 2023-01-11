import { PostDBO } from "@DBO/post.dbo";

export interface IPostRepository {
    create(user: PostDBO): Promise<void>;
}