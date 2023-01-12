import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BlogCreateDTO } from '@DTO/blog/blog-create.dto';
import { IBlogService } from './interfaces';
import { BlogEntity } from '@Entity/blog.entity';
import { IBlogRepository } from '@Database/interfaces/blog.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { BlogDBO } from '@DBO/blog.dbo';
import { mapBlogCreateDTOToBlogEntity, mapBlogDBOToBlogEntity, mapBlogEntityToBlogDBO, mapBlogEntityToBlogDTO, updateBlogDBOWithBlogEntity } from '@Mappers/blog.mapper';
import { BlogReadDTO } from '@DTO/blog/blog-read.dto';
import { BlogUpdateDTO } from '@DTO/blog/blog-update.dto';
import { WrongData } from '@Errors/WrongData';
import { SomethingWentWrong } from '@Errors/SomethingWentWrong';

@injectable()
export class BlogService implements IBlogService {

    private readonly _blogRepository: IBlogRepository;

    constructor(
        @inject(DI_TYPES.BlogRepository) blogRepository: IBlogRepository,
    ) {
        this._blogRepository = blogRepository;
    }

    public async create(blogCreateDTO: BlogCreateDTO): Promise<number> {
        const blogEntity: BlogEntity = mapBlogCreateDTOToBlogEntity(blogCreateDTO);

        const blogDBO: BlogDBO = mapBlogEntityToBlogDBO(blogEntity);

        const createdId = await this._blogRepository.create(blogDBO);

        if (!createdId) {
            throw new SomethingWentWrong('cant create :(');
        }

        return createdId;
    }

    public async read(id: number): Promise<BlogReadDTO> {
        const blogDBO: BlogDBO | null =  await this._blogRepository.read(id);

        if (!blogDBO) {
            throw new WrongData('this id does not exist');
        }

        const blogEntity: BlogEntity = mapBlogDBOToBlogEntity(blogDBO);

        const blogReadDTO: BlogReadDTO = mapBlogEntityToBlogDTO(blogEntity);

        return blogReadDTO;
    }

    public async update(blogUpdateDTO: BlogUpdateDTO): Promise<void> {
        const blogDBO: BlogDBO | null =  await this._blogRepository.read(blogUpdateDTO.id);

        if (!blogDBO) {
            throw new WrongData('this id does not exist');
        }

        const blogEntity: BlogEntity = mapBlogDBOToBlogEntity(blogDBO);

        const blogDBOUpdated: BlogDBO = updateBlogDBOWithBlogEntity(blogDBO, blogEntity);

        return await this._blogRepository.update(blogDBOUpdated);
    }

    public async delete(id: number): Promise<void> {
        return await this._blogRepository.delete(id);
    }

}