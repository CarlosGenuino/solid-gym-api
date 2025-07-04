import UserRepository from "@/repository/user-repository";
import { comparePasswords } from "@/util/hash";
import { User } from "generated/prisma";
import { InvalidCredentialError } from "./error/invalid-credential-error";

export interface AuthenticateUseCaseInput{
    email: string
    password: string
}

export interface AuthenticateUseCaseOutput {
    user: User
}

export class AuthenticateUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({email, password}: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput>{
        const user = await this.userRepository.getUserByEmail(email)

        if (!user){
            throw new InvalidCredentialError()
        }

        const doesPasswordMatches = comparePasswords(password, user.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialError()
        }

        return {
            user
        }
    }
}