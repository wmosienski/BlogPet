import { IUserRepository } from "@Database/interfaces/user.repository.interface";
import { UserDBO } from "@DBO/user.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures";
import functions from "./functions";
import { TokenDBO } from "@DBO/token.dbo";

@injectable()
export class UserRepository implements IUserRepository {
    async register(userDBO: UserDBO): Promise<undefined | number> {
        const result = await pg().func(functions.user.create, [userDBO.email, userDBO.password]);

        return result.length && result[0]?.create_user || undefined;
    }

    async read(id: number): Promise<UserDBO | null> {
        const userDBOs: UserDBO[] = await pg().func(functions.user.read, [id]);

        return userDBOs.length ? userDBOs[0] : null;
    }

    async update(userDBO: UserDBO): Promise<void> {
        return await pg().proc(procedures.user.update, [userDBO.id, userDBO.email, userDBO.password])
    }

    async delete(id: number): Promise<void> {
        return await pg().proc(procedures.user.delete, [id])
    }

    async findByEmail(email: string): Promise<UserDBO | null> {
        const userDBOs: UserDBO[] = await pg().func(functions.user.findByEmail, [email]);

        return userDBOs.length ? userDBOs[0] : null;
    }

    async createToken(userId: number, token: string): Promise<undefined | number> {
        const result = await pg().func(functions.token.create, [userId, token]);

        return result.length && result[0]?.create_token || undefined;
    }

    async findTokenByToken(token: string): Promise<TokenDBO | null> {
        const result = await pg().func(functions.token.findByToken, [token]);

        return result.length ? result[0] : null;
    }

    async findTokensByUserId(userId: number): Promise<string[] | null> {
        const tokenObjects = await pg().func(functions.token.findByUserId, [userId]);

        const tokenValues = tokenObjects.map((e: {token: string}) => e.token);

        return tokenValues;
    }

    async deleteTokenByUserId(userId: number): Promise<void> {
        await pg().proc(procedures.token.deleteByUserId, [userId]);
    }

    async deleteTokenByToken(token: string): Promise<void> {
        await pg().proc(procedures.token.deleteByToken, [token]);
    }

}