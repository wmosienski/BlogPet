import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { PostCreateDTO } from '@DTO/post/post-create.dto';
import { IPostService } from './interfaces';
import { PostEntity } from '@Entity/post.entity';
import { IPostRepository } from '@Database/interfaces/post.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { PostDBO } from '@DBO/post.dbo';
import { mapPostCreateDTOToPostEntity, mapPostDBOToPostEntity, mapPostEntityToPostDBO } from '@Mappers/user/post.mapper';

@injectable()
export class PostService implements IPostService {

    private readonly _postRepository: IPostRepository;

    constructor(
        @inject(DI_TYPES.PostRepository) postRepository: IPostRepository,
    ) {
        this._postRepository = postRepository;
    }

    public async create(postCreateDTO: PostCreateDTO): Promise<void> {
        const postEntity: PostEntity = mapPostCreateDTOToPostEntity(postCreateDTO);

        const postDBO: PostDBO = mapPostEntityToPostDBO(postEntity);

        await this._postRepository.create(postDBO);

    }

}