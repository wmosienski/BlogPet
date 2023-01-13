import { IUserRepository } from "@Database/interfaces/user.repository.interface";
import { UserDBO } from "@DBO/user.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures";
import functions from "./functions";

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
}