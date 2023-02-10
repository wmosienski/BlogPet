import { IUserRepository } from "@Database/interfaces/user.repository.interface";
import { TokenDBO } from "@DBO/token.dbo";
import { UserDBO } from "@DBO/user.dbo";
import { UserLoginDTO } from "@DTO/user/user-login.dto";
import { UserLogoutDTO } from "@DTO/user/user-logout.dto";
import { UserRegisterDTO } from "@DTO/user/user-register.dto";
import { UserEntity } from "@Entity/user.entity";
import { NoAccess } from "@Errors/NoAccess";
import { Unauthorized } from "@Errors/Unauthorized";
import { ValueAlreadyInUse } from "@Errors/ValueAlreadyInUse";
import { WrongData } from "@Errors/WrongData";
import { mapUserEntityToUserDBO, mapUserRegisterDTOToUserEntity } from "@Mappers/user.mapper";
import { config } from "@Utils/config/general.config";
import { compare, generateToken, verifyToken } from "@Utils/crypt";
import { DI_TYPES } from "DI_TYPES";
import { injectable, inject } from "inversify";
import { TokenExpiredError } from "jsonwebtoken";
import { IUserService } from "./interfaces/user.interface";

@injectable()
export class UserService implements IUserService {

    private readonly _userRepository: IUserRepository;

    constructor(
        @inject(DI_TYPES.UserRepository) userRepository: IUserRepository
    ) {
        this._userRepository = userRepository;
    }

    public async register(userRegisterDTO: UserRegisterDTO): Promise<void> {
        const userEntity: UserEntity = mapUserRegisterDTOToUserEntity(userRegisterDTO);

        const userSameEmail = await this._userRepository.findByEmail(userEntity.email);
        if (userSameEmail) {
            throw new ValueAlreadyInUse('email already taken');
        }

        await userEntity.hashPassword();

        const userDBO: UserDBO = mapUserEntityToUserDBO(userEntity);

        await this._userRepository.register(userDBO);

    }

    public async login(userLoginDTO: UserLoginDTO): Promise<{accessToken: string, refreshToken: string}> {
        const userDBO = await this._userRepository.findByEmail(userLoginDTO.email);

        if (!userDBO?.id) {
            throw new Unauthorized('wrong email or password');
        }

        const isPasswordCorrect = await compare(userLoginDTO.password, userDBO?.password || '');
        if (!isPasswordCorrect) {
            throw new Unauthorized('wrong email or password');
        }

        const accessToken = await generateToken({userId: userDBO?.id}, config.accessTokenExpireTime);

        const refreshToken = await generateToken({userId: userDBO?.id}, config.refreshTokenExpireTime);

        this._userRepository.createToken(userDBO.id, refreshToken);

        return { accessToken, refreshToken };
    }

    public async logout(refreshToken: string): Promise<void> {
        await this._userRepository.deleteTokenByValue(refreshToken);
    }

    async refreshSession(refreshToken: string): Promise<string> {
        let tokenData;
        
        try {
            tokenData = verifyToken(refreshToken);
        } catch(error) {
            await this._userRepository.deleteTokenByValue(refreshToken);
            throw new NoAccess('bad token');
        }

        const foundToken: TokenDBO | null = await this._userRepository.findTokenByValue(refreshToken);

        if (!foundToken) {
            await this._userRepository.deleteTokenByUserId(tokenData.userId);

            throw new NoAccess('token resued');
        }

        const accessToken = await generateToken({userId: foundToken.auth_user_id}, config.accessTokenExpireTime);

        return accessToken;
    }

}
