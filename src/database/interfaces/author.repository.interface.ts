import { AuthorDBO } from "@DBO/author.dbo";

export interface IAuthorRepository {
    create(authorDBO: AuthorDBO): Promise<undefined | number>;
    read(id: number): Promise<AuthorDBO | null>;
    update(authorDBO: AuthorDBO): Promise<void>;
    delete(id: number): Promise<void>;
}