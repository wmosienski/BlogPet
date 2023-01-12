import { AuthorDBO } from "@DBO/author.dbo";
import { AuthorCreateDTO } from "@DTO/author/author-create.dto";
import { AuthorReadDTO } from "@DTO/author/author-read.dto";
import { AuthorUpdateDTO } from "@DTO/author/author-update.dto";

export interface IAuthorService {

    create: (authorCreateDTO: AuthorCreateDTO) => Promise<number>;

    read: (id: number) => Promise<AuthorReadDTO>;

    update: (authorUpdateDTO: AuthorUpdateDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

}
