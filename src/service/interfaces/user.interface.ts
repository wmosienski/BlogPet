import { UserLoginDTO } from "@DTO/user/user-login.dto";
import { UserLogoutDTO } from "@DTO/user/user-logout.dto";
import { UserRegisterDTO } from "@DTO/user/user-register.dto";

export interface IUserService {

    register: (userRegisterDTO: UserRegisterDTO) => Promise<void>;

    login(userLoginDTO: UserLoginDTO): Promise<{accessToken: string, refreshToken: string}>;

    logout(refreshToken: string): Promise<void>;

    refreshSession(refreshToken: string): Promise<string>;

}
