import { TokenDBO } from "@DBO/token.dbo";
import { UserDBO } from "@DBO/user.dbo";

export interface IUserRepository {
    register(userDBO: UserDBO): Promise<undefined | number>;
    read(id: number): Promise<UserDBO | null>;
    update(userDBO: UserDBO): Promise<void>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<UserDBO | null>;
    createToken(userId: number, value: string): Promise<undefined | number>;
    findTokenByValue(value: string): Promise<TokenDBO | null>;
    findTokensByUserId(userId: number): Promise<string[] | null>;
    deleteTokenByUserId(userId: number): Promise<void>;
    deleteTokenByValue(value: string): Promise<void>;
}