import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { PostCreateDTO } from '@DTO/post/post-create.dto';
import { IPostService } from './interfaces';
import { PostEntity } from '@Entity/post.entity';
import { IPostRepository } from '@Database/interfaces/post.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { PostDBO } from '@DBO/post.dbo';
import { mapPostCreateDTOToPostEntity, mapPostDBOToPostEntity, mapPostEntityToPostDBO, mapPostEntityToPostDTO, updatePostDBOWithPostEntity } from '@Mappers/post.mapper';
import { PostReadDTO } from '@DTO/post/post-read.dto';
import { PostUpdateDTO } from '@DTO/post/post-update.dto';
import { WrongData } from '@Errors/WrongData';
import { SomethingWentWrong } from '@Errors/SomethingWentWrong';

@injectable()
export class PostService implements IPostService {

    private readonly _postRepository: IPostRepository;

    constructor(
        @inject(DI_TYPES.PostRepository) postRepository: IPostRepository,
    ) {
        this._postRepository = postRepository;
    }

    public async create(postCreateDTO: PostCreateDTO): Promise<number> {
        const postEntity: PostEntity = mapPostCreateDTOToPostEntity(postCreateDTO);

        const postDBO: PostDBO = mapPostEntityToPostDBO(postEntity);

        const createdId = await this._postRepository.create(postDBO);

        if (!createdId) {
            throw new SomethingWentWrong('cant create :(');
        }

        return createdId;
    }

    public async read(id: number): Promise<PostReadDTO> {
        const postDBO: PostDBO | null =  await this._postRepository.read(id);

        if (!postDBO) {
            throw new WrongData('this id does not exist');
        }

        const postEntity: PostEntity = mapPostDBOToPostEntity(postDBO);

        const postReadDTO: PostReadDTO = mapPostEntityToPostDTO(postEntity);

        return postReadDTO;
    }

    public async update(postUpdateDTO: PostUpdateDTO): Promise<void> {
        const postDBO: PostDBO | null =  await this._postRepository.read(postUpdateDTO.id);

        if (!postDBO) {
            throw new WrongData('this id does not exist');
        }

        const postEntity: PostEntity = mapPostDBOToPostEntity(postDBO);

        const postDBOUpdated: PostDBO = updatePostDBOWithPostEntity(postDBO, postEntity);

        return await this._postRepository.update(postDBOUpdated);
    }

    public async delete(id: number): Promise<void> {
        return await this._postRepository.delete(id);
    }

}