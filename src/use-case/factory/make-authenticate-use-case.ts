import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "../authenticate-use-case";
import UserRepository from "@/repository/user-repository";

export default function makeAuthenticateUseCase(repository?: UserRepository){
    if(!repository)
        repository = new InMemoryUsersRepository()
    return new AuthenticateUseCase(repository)
}