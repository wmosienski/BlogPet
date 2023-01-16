import { hash } from "@Utils/crypt";

export class UserEntity {
    id: string;
    email: string;
    password: string;

    public async hashPassword() {
        this.password = await hash(this.password);
    }
}