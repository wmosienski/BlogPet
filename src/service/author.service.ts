import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { AuthorCreateDTO } from '@DTO/author/author-create.dto';
import { IAuthorService } from './interfaces';
import { AuthorEntity } from '@Entity/author.entity';
import { IAuthorRepository } from '@Database/interfaces/author.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { AuthorDBO } from '@DBO/author.dbo';
import { mapAuthorCreateDTOToAuthorEntity, mapAuthorDBOToAuthorEntity, mapAuthorEntityToAuthorDBO, mapAuthorEntityToAuthorDTO, mapAuthorUpdateDTOToAuthorEntity, updateAuthorDBOWithAuthorEntity } from '@Mappers/author.mapper';
import { AuthorUpdateDTO } from '@DTO/author/author-update.dto';
import { AuthorReadDTO } from '@DTO/author/author-read.dto';
import { WrongData } from '@Errors/WrongData';
import { SomethingWentWrong } from '@Errors/SomethingWentWrong';

@injectable()
export class AuthorService implements IAuthorService {

    private readonly _authorRepository: IAuthorRepository;

    constructor(
        @inject(DI_TYPES.AuthorRepository) authorRepository: IAuthorRepository,
    ) {
        this._authorRepository = authorRepository;
    }

    public async create(authorCreateDTO: AuthorCreateDTO): Promise<number> {
        const authorEntity: AuthorEntity = mapAuthorCreateDTOToAuthorEntity(authorCreateDTO);

        const authorDBO: AuthorDBO = mapAuthorEntityToAuthorDBO(authorEntity);

        const createdId = await this._authorRepository.create(authorDBO);

        if (!createdId) {
            throw new SomethingWentWrong('cant create :(');
        }

        return createdId;
    }

    public async read(id: number): Promise<AuthorReadDTO> {
        const authorDBO: AuthorDBO | null =  await this._authorRepository.read(id);

        if (!authorDBO) {
            throw new WrongData('this id does not exist');
        }

        const authorEntity: AuthorEntity = mapAuthorDBOToAuthorEntity(authorDBO);

        const authorReadDTO: AuthorReadDTO = mapAuthorEntityToAuthorDTO(authorEntity);

        return authorReadDTO;
    }

    public async update(authorUpdateDTO: AuthorUpdateDTO): Promise<void> {
        const authorDBO: AuthorDBO | null =  await this._authorRepository.read(authorUpdateDTO.id);

        if (!authorDBO) {
            throw new WrongData('this id does not exist');
        }

        const authorEntity: AuthorEntity = mapAuthorDBOToAuthorEntity(authorDBO);

        const authorDBOUpdated: AuthorDBO = updateAuthorDBOWithAuthorEntity(authorDBO, authorEntity);

        return await this._authorRepository.update(authorDBOUpdated);
    }

    public async delete(id: number): Promise<void> {
        return await this._authorRepository.delete(id);
    }

}