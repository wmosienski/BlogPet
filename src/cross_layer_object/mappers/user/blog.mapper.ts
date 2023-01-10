import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";
import { BlogEntity } from "@Entity/blog.entity";
import { BlogDBO } from "@DBO/blog.dbo";

export const mapBlogCreateDTOToBlogEntity = (blogCreateDTO: BlogCreateDTO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.title = blogCreateDTO.title;
    blogEntity.content = blogCreateDTO.content;
    return blogEntity;
}

export const mapBlogEntityToBlogDBO = (blogEntity: BlogEntity): BlogDBO => {
    const blogDBO = new BlogDBO();
    blogDBO.title = blogEntity.title;
    blogDBO.content = blogEntity.content;
    return blogDBO;
}

export const mapBlogDBOToBlogEntity = (blogDBO: BlogDBO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.title = blogDBO.title;
    blogEntity.content = blogDBO.content;
    return blogEntity;
}