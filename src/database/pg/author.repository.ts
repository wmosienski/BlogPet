import { IAuthorRepository } from "@Database/interfaces/author.repository.interface";
import { AuthorDBO } from "@DBO/author.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures"

@injectable()
export class AuthorRepository implements IAuthorRepository {
    async create(authorDBO: AuthorDBO): Promise<void> {
        return await pg().proc(procedures.author.create, [authorDBO.countryId, authorDBO.firstname, authorDBO.lastname])
    }    
}