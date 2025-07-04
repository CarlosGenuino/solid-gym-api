import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository"
import { RegisterUseCase } from "../register-use-case"

export default function makeRegisterUseCase(){
    const repository = new InMemoryUsersRepository()
    return new RegisterUseCase(repository)
}