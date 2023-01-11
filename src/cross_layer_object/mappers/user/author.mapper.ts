import { AuthorCreateDTO } from "@DTO/author/author-create.dto";
import { AuthorEntity } from "@Entity/author.entity";
import { AuthorDBO } from "@DBO/author.dbo";

export const mapAuthorCreateDTOToAuthorEntity = (authorCreateDTO: AuthorCreateDTO): AuthorEntity => {
    const authorEntity = new AuthorEntity();
    authorEntity.lastname = authorCreateDTO.lastname;
    authorEntity.firstname = authorCreateDTO.firstname;
    authorEntity.countryId = authorCreateDTO.countryId;
    return authorEntity;
}

export const mapAuthorEntityToAuthorDBO = (authorEntity: AuthorEntity): AuthorDBO => {
    const authorDBO = new AuthorDBO();
    authorDBO.lastname = authorEntity.lastname;
    authorDBO.firstname = authorEntity.firstname;
    authorDBO.countryId = authorEntity.countryId;
    return authorDBO;
}

export const mapAuthorDBOToAuthorEntity = (authorDBO: AuthorDBO): AuthorEntity => {
    const authorEntity = new AuthorEntity();
    authorEntity.lastname = authorDBO.lastname;
    authorEntity.firstname = authorDBO.firstname;
    authorEntity.countryId = authorDBO.countryId;
    return authorEntity;
}