import { UserRegisterDTO } from "@DTO/user/user-register.dto";
import { UserEntity } from "@Entity/user.entity";
import { UserDBO } from "@DBO/user.dbo";
import { UserLoginDTO } from "@DTO/user/user-login.dto";

export const mapUserRegisterDTOToUserEntity = (userRegisterDTO: UserRegisterDTO): UserEntity => {
    const userEntity = new UserEntity();
    userEntity.email = userRegisterDTO.email;
    userEntity.password = userRegisterDTO.password;
    return userEntity;
}

export const mapUserLoginDTOToUserEntity = (userLoginDTO: UserLoginDTO): UserEntity => {
    const userEntity = new UserEntity();
    userEntity.email = userLoginDTO.email;
    userEntity.password = userLoginDTO.password;
    return userEntity;
}

export const mapUserEntityToUserDBO = (userEntity: UserEntity): UserDBO => {
    const userDBO = new UserDBO();
    userDBO.id = userEntity.id;
    userDBO.email = userEntity.email;
    userDBO.password = userEntity.password;
    return userDBO;
}

export const mapUserDBOToUserEntity = (userDBO: UserDBO): UserEntity => {
    const userEntity = new UserEntity();
    userEntity.id = userDBO.id;
    userEntity.email = userDBO.email;
    userEntity.password = userDBO.password;
    return userEntity;
}