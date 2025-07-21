import UserRepository from "@/repository/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetProfileUseCase } from "./get-profile-use-case";
import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import ResourceNotFoundError from "./error/resource-not-found-error";

let userRepository: UserRepository
let sut: GetProfileUseCase


describe("Get Profile Use Case", async ()=> {
    beforeEach(()=> {
        userRepository = new InMemoryUsersRepository()
        sut = new GetProfileUseCase(userRepository)
    })
    
    it("It should return a user profile", async ()=> {
        const user = await userRepository.createUser({
            email: 'test@test.com',
            name: 'Crash Test Dummie',
            password: "dummie"
        })

        const result = await sut.execute({userId: user.id})
        expect(result).toHaveProperty('user')
        expect(result.user).toHaveProperty('id')
    })

    it("It should throw Error when a profile user does not exists", async ()=> {
       await expect(()=> sut.execute({userId: 'bla'})).rejects.toThrowError(ResourceNotFoundError)
    })
})