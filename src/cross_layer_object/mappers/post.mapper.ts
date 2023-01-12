import { PostCreateDTO } from "@DTO/post/post-create.dto";
import { PostEntity } from "@Entity/post.entity";
import { PostDBO } from "@DBO/post.dbo";
import { PostUpdateDTO } from "@DTO/post/post-update.dto";
import { PostReadDTO } from "@DTO/post/post-read.dto";

export const mapPostCreateDTOToPostEntity = (postCreateDTO: PostCreateDTO): PostEntity => {
    const postEntity = new PostEntity();
    postEntity.title = postCreateDTO.title;
    postEntity.text = postCreateDTO.text;
    postEntity.blogId = postCreateDTO.blogId;
    return postEntity;
}

export const mapPostUpdateDTOToPostEntity = (postUpdateDTO: PostUpdateDTO): PostEntity => {
    const postEntity = new PostEntity();
    postEntity.id = postUpdateDTO.id;
    postEntity.title = postUpdateDTO.title;
    postEntity.text = postUpdateDTO.text;
    return postEntity;
}

export const mapPostEntityToPostDBO = (postEntity: PostEntity): PostDBO => {
    const postDBO = new PostDBO();
    postDBO.id = postEntity.id;
    postDBO.title = postEntity.title;
    postDBO.text = postEntity.text;
    postDBO.blogId = postEntity.blogId;
    return postDBO;
}

export const mapPostEntityToPostDTO = (postEntity: PostEntity): PostReadDTO => {
    const postDTO = new PostReadDTO();
    postDTO.id = postEntity.id;
    postDTO.title = postEntity.title;
    postDTO.text = postEntity.text;
    return postDTO;
}

export const mapPostDBOToPostEntity = (postDBO: PostDBO): PostEntity => {
    const postEntity = new PostEntity();
    postEntity.id = postDBO.id;
    postEntity.title = postDBO.title;
    postEntity.text = postDBO.text;
    postEntity.blogId = postDBO.blogId;
    return postEntity;
}

export const updatePostDBOWithPostEntity = (postDBO: PostDBO, postEntity: PostEntity): PostDBO => {
    postDBO.title = postEntity.title ? postEntity.title : postDBO.title;
    postDBO.text = postEntity.text ? postEntity.text : postDBO.text;
    return postDBO;
}