import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BlogCreateDTO } from '@DTO/blog/blog-create.dto';
import { IBlogService } from './interfaces';
import { BlogEntity } from '@Entity/blog.entity';
import { IBlogRepository } from '@Database/interfaces/blog.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { BlogDBO } from '@DBO/blog.dbo';
import { mapBlogDBOToBlogEntity, mapBlogEntityToBlogDBO } from '@Mappers/user/blog.mapper';

@injectable()
export class BlogService implements IBlogService {

    private readonly _blogRepository: IBlogRepository;

    constructor(
        @inject(DI_TYPES.BlogRepository) blogRepository: IBlogRepository,
    ) {
        this._blogRepository = blogRepository;
    }

    public async create(blogCreateDTO: BlogCreateDTO): Promise<void> {
        const blogEntity: BlogEntity = mapBlogDBOToBlogEntity(blogCreateDTO);

        const blogDBO: BlogDBO = mapBlogEntityToBlogDBO(blogEntity);

        await this._blogRepository.create(blogDBO);

    }

}