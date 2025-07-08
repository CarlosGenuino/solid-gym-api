import { AuthenticateUseCase } from "../authenticate-use-case";
import UserRepository from "@/repository/user-repository";

export default function makeAuthenticateUseCase(repository: UserRepository){
    return new AuthenticateUseCase(repository)
}