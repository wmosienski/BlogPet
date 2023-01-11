import { PostCreateDTO } from "@DTO/post/post-create.dto";
import { PostEntity } from "@Entity/post.entity";
import { PostDBO } from "@DBO/post.dbo";

export const mapPostCreateDTOToPostEntity = (postCreateDTO: PostCreateDTO): PostEntity => {
    const postEntity = new PostEntity();
    postEntity.title = postCreateDTO.title;
    postEntity.text = postCreateDTO.text;
    postEntity.blogId = postCreateDTO.blogId;
    return postEntity;
}

export const mapPostEntityToPostDBO = (postEntity: PostEntity): PostDBO => {
    const postDBO = new PostDBO();
    postDBO.title = postEntity.title;
    postDBO.text = postEntity.text;
    postDBO.blogId = postEntity.blogId;
    return postDBO;
}

export const mapPostDBOToPostEntity = (postDBO: PostDBO): PostEntity => {
    const postEntity = new PostEntity();
    postEntity.title = postDBO.title;
    postEntity.text = postDBO.text;
    postEntity.blogId = postDBO.blogId;
    return postEntity;
}