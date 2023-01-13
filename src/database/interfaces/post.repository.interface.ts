import { PostDBO } from "@DBO/post.dbo";

export interface IPostRepository {
    create(postDBO: PostDBO): Promise<undefined | number>;
    read(id: number): Promise<PostDBO | null>;
    update(postDBO: PostDBO): Promise<void>;
    delete(id: number): Promise<void>;
}