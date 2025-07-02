import { hashPassword } from "@/util/hash";
import UserAlreadyExistsError from "./error/user-already-exists-error";
import UserRepository from "@/repository/user-repository";

export interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private repository: UserRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const existingUser = await this.repository.getUserByEmail(email);

        if (existingUser) {
            throw new UserAlreadyExistsError(email)
        }

        const hashedPassword = await hashPassword(password);

        const user = await this.repository.createUser({
            name,
            email,
            password: hashedPassword,
        })

        return user
    }
}
