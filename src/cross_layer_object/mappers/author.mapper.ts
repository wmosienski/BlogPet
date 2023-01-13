import { AuthorCreateDTO } from "@DTO/author/author-create.dto";
import { AuthorEntity } from "@Entity/author.entity";
import { AuthorDBO } from "@DBO/author.dbo";
import { AuthorReadDTO } from "@DTO/author/author-read.dto";
import { AuthorUpdateDTO } from "@DTO/author/author-update.dto";

export const mapAuthorCreateDTOToAuthorEntity = (authorCreateDTO: AuthorCreateDTO): AuthorEntity => {
    const authorEntity = new AuthorEntity();
    authorEntity.lastname = authorCreateDTO.lastname;
    authorEntity.firstname = authorCreateDTO.firstname;
    authorEntity.countryId = authorCreateDTO.countryId;
    authorEntity.userId = authorCreateDTO.userId;
    return authorEntity;
}

export const mapAuthorUpdateDTOToAuthorEntity = (authorUpdateDTO: AuthorUpdateDTO): AuthorEntity => {
    const authorEntity = new AuthorEntity();
    authorEntity.id = authorUpdateDTO.id;
    authorEntity.lastname = authorUpdateDTO.lastname;
    authorEntity.firstname = authorUpdateDTO.firstname;
    return authorEntity;
}

export const mapAuthorEntityToAuthorDBO = (authorEntity: AuthorEntity): AuthorDBO => {
    const authorDBO = new AuthorDBO();
    authorDBO.id = authorEntity.id;
    authorDBO.lastname = authorEntity.lastname;
    authorDBO.firstname = authorEntity.firstname;
    authorDBO.countryId = authorEntity.countryId;
    authorDBO.userId = authorEntity.userId;
    return authorDBO;
}

export const mapAuthorEntityToAuthorDTO = (authorEntity: AuthorEntity): AuthorReadDTO => {
    const authorDTO = new AuthorReadDTO();
    authorDTO.id = authorEntity.id;
    authorDTO.lastname = authorEntity.lastname;
    authorDTO.firstname = authorEntity.firstname;
    authorDTO.countryId = authorEntity.countryId;
    return authorDTO;
}

export const mapAuthorDBOToAuthorEntity = (authorDBO: AuthorDBO): AuthorEntity => {
    const authorEntity = new AuthorEntity();
    authorEntity.id = authorDBO.id;
    authorEntity.lastname = authorDBO.lastname;
    authorEntity.firstname = authorDBO.firstname;
    authorEntity.countryId = authorDBO.countryId;
    authorEntity.userId = authorDBO.userId;
    return authorEntity;
}

export const updateAuthorDBOWithAuthorEntity = (authorDBO: AuthorDBO, authorEntity: AuthorEntity): AuthorDBO => {
    authorDBO.lastname = authorEntity.lastname ? authorEntity.lastname : authorDBO.lastname;
    authorDBO.firstname = authorEntity.firstname ? authorEntity.firstname : authorDBO.firstname;
    return authorDBO;
}