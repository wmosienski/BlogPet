import { IAuthorRepository } from "@Database/interfaces/author.repository.interface";
import { AuthorDBO } from "@DBO/author.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures";
import functions from "./functions";

@injectable()
export class AuthorRepository implements IAuthorRepository {
    async create(authorDBO: AuthorDBO): Promise<undefined | number> {
        const result = await pg().func(functions.author.create, [authorDBO.countryId, authorDBO.firstname, authorDBO.lastname]);

        return result.length && result[0]?.create_author || undefined;
    }

    async read(id: number): Promise<AuthorDBO | null> {
        const authorDBOs: AuthorDBO[] = await pg().func(functions.author.read, [id]);

        return authorDBOs.length ? authorDBOs[0] : null;
    }

    async update(authorDBO: AuthorDBO): Promise<void> {
        return await pg().proc(procedures.author.update, [authorDBO.id, authorDBO.firstname, authorDBO.lastname])
    }

    async delete(id: number): Promise<void> {
        return await pg().proc(procedures.author.delete, [id])
    }
}