import { BlogCreateDTO } from "@DTO/blog/blog-create.dto";
import { BlogEntity } from "@Entity/blog.entity";
import { BlogDBO } from "@DBO/blog.dbo";
import { BlogUpdateDTO } from "@DTO/blog/blog-update.dto";
import { BlogReadDTO } from "@DTO/blog/blog-read.dto";

export const mapBlogCreateDTOToBlogEntity = (blogCreateDTO: BlogCreateDTO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.title = blogCreateDTO.title;
    blogEntity.description = blogCreateDTO.description;
    blogEntity.authorId = blogCreateDTO.authorId;
    return blogEntity;
}

export const mapBlogUpdateDTOToBlogEntity = (blogUpdateDTO: BlogUpdateDTO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.id = blogUpdateDTO.id;
    blogEntity.title = blogUpdateDTO.title;
    blogEntity.description = blogUpdateDTO.description;
    return blogEntity;
}

export const mapBlogEntityToBlogDBO = (blogEntity: BlogEntity): BlogDBO => {
    const blogDBO = new BlogDBO();
    blogDBO.id = blogEntity.id;
    blogDBO.title = blogEntity.title;
    blogDBO.description = blogEntity.description;
    blogDBO.authorId = blogEntity.authorId;
    return blogDBO;
}

export const mapBlogEntityToBlogDTO = (blogEntity: BlogEntity): BlogReadDTO => {
    const blogDTO = new BlogReadDTO();
    blogDTO.id = blogEntity.id;
    blogDTO.title = blogEntity.title;
    blogDTO.description = blogEntity.description;
    blogDTO.authorId = blogEntity.authorId;
    return blogDTO;
}

export const mapBlogDBOToBlogEntity = (blogDBO: BlogDBO): BlogEntity => {
    const blogEntity = new BlogEntity();
    blogEntity.title = blogDBO.title;
    blogEntity.description = blogDBO.description;
    blogEntity.authorId = blogDBO.authorId;
    return blogEntity;
}

export const updateBlogDBOWithBlogEntity = (blogDBO: BlogDBO, blogEntity: BlogEntity): BlogDBO => {
    blogDBO.title = blogEntity.title ? blogEntity.title : blogDBO.title;
    blogDBO.description = blogEntity.description ? blogEntity.description : blogDBO.description;
    return blogDBO;
}