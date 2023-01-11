import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { AuthorCreateDTO } from '@DTO/author/author-create.dto';
import { IAuthorService } from './interfaces';
import { AuthorEntity } from '@Entity/author.entity';
import { IAuthorRepository } from '@Database/interfaces/author.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { AuthorDBO } from '@DBO/author.dbo';
import { mapAuthorCreateDTOToAuthorEntity, mapAuthorDBOToAuthorEntity, mapAuthorEntityToAuthorDBO } from '@Mappers/user/author.mapper';

@injectable()
export class AuthorService implements IAuthorService {

    private readonly _authorRepository: IAuthorRepository;

    constructor(
        @inject(DI_TYPES.AuthorRepository) authorRepository: IAuthorRepository,
    ) {
        this._authorRepository = authorRepository;
    }

    public async create(authorCreateDTO: AuthorCreateDTO): Promise<void> {
        const authorEntity: AuthorEntity = mapAuthorCreateDTOToAuthorEntity(authorCreateDTO);

        const authorDBO: AuthorDBO = mapAuthorEntityToAuthorDBO(authorEntity);

        await this._authorRepository.create(authorDBO);

    }

}