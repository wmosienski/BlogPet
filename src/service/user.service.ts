import { IUserRepository } from "@Database/interfaces/user.repository.interface";
import { UserDBO } from "@DBO/user.dbo";
import { UserLoginDTO } from "@DTO/user/user-login.dto";
import { UserRefreshDTO } from "@DTO/user/user-refresh.dto";
import { UserRegisterDTO } from "@DTO/user/user-register.dto";
import { UserEntity } from "@Entity/user.entity";
import { Unauthorized } from "@Errors/Unauthorized";
import { ValueAlreadyInUse } from "@Errors/ValueAlreadyInUse";
import { mapUserEntityToUserDBO, mapUserRegisterDTOToUserEntity } from "@Mappers/user.mapper";
import { config } from "@Utils/config/general.config";
import { compare, generateToken, verifyToken } from "@Utils/crypt";
import { DI_TYPES } from "DI_TYPES";
import { injectable, inject } from "inversify";
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

        return { accessToken, refreshToken };
    }

    async refresh(userRefreshDTO: UserRefreshDTO): Promise<string> {
        const tokenData = verifyToken(userRefreshDTO.refreshToken);

        const accessToken = await generateToken(tokenData, config.accessTokenExpireTime);

        return accessToken;
    }

}
