import { UserDBO } from "@DBO/user.dbo";

export interface IUserRepository {
    register(userDBO: UserDBO): Promise<undefined | number>;
    read(id: number): Promise<UserDBO | null>;
    update(userDBO: UserDBO): Promise<void>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<UserDBO | null>;
}