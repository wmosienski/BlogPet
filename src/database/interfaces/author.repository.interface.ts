import { AuthorDBO } from "@DBO/author.dbo";

export interface IAuthorRepository {
    create(user: AuthorDBO): Promise<void>;
}