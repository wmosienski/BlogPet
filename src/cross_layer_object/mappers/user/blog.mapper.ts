import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";
import { BlogEntity } from "@Entity/blog.entity";
import { BlogDBO } from "@DBO/blog.dbo";

export const mapBlogCreateDTOToBlogEntity = (blogCreateDTO: BlogCreateDTO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.title = blogCreateDTO.title;
    blogEntity.description = blogCreateDTO.description;
    blogEntity.authorId = blogCreateDTO.authorId;
    return blogEntity;
}

export const mapBlogEntityToBlogDBO = (blogEntity: BlogEntity): BlogDBO => {
    const blogDBO = new BlogDBO();
    blogDBO.title = blogEntity.title;
    blogDBO.description = blogEntity.description;
    blogDBO.authorId = blogEntity.authorId;
    return blogDBO;
}

export const mapBlogDBOToBlogEntity = (blogDBO: BlogDBO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.title = blogDBO.title;
    blogEntity.description = blogDBO.description;
    blogEntity.authorId = blogDBO.authorId;
    return blogEntity;
}