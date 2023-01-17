import { hash } from "@Utils/crypt";

export class UserEntity {
    id: number;
    email: string;
    password: string;

    public async hashPassword() {
        this.password = await hash(this.password);
    }
}