import { AuthorCreateDTO } from "@DTO/author/author-create.dto";

export interface IAuthorService {

    create: (authorCreateDTO: AuthorCreateDTO) => Promise<void>;

}
