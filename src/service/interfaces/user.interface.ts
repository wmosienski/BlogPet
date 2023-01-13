import { UserLoginDTO } from "@DTO/user/user-login.dto";
import { UserRefreshDTO } from "@DTO/user/user-refresh.dto";
import { UserRegisterDTO } from "@DTO/user/user-register.dto";

export interface IUserService {

    register: (userRegisterDTO: UserRegisterDTO) => Promise<void>;

    login(userLoginDTO: UserLoginDTO): Promise<{accessToken: string, refreshToken: string}>;

    refresh(userRefreshDTO: UserRefreshDTO): Promise<string>;

    verifyToken: (token: string) => Promise<any>;

}
