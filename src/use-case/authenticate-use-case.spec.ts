import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InvalidCredentialError } from "./error/invalid-credential-error";
import UserRepository from "@/repository/user-repository";
import makeAuthenticateUseCase from "./factory/make-authenticate-use-case";

let repository: UserRepository
let sut: AuthenticateUseCase


describe('AuthenticateUseCase', async () => {
    beforeEach(() => {
        repository = new InMemoryUsersRepository()
        sut = makeAuthenticateUseCase(repository)
    })
    it('should throw InvalidCredentialError for invalid credentials to wrong email', async () => {
        await expect(() => sut.execute({ email: 'invalid@example.com', password: 'wrongpassword' }))
            .rejects.toThrowError(InvalidCredentialError);
    });

    it('should throw InvalidCredentialError for invalid credentials to wrong password', async () => {
        await repository.createUser({ email: 'valid@example.com', name: 'Valid User', password: 'correctpassword' });
        await expect(() => sut.execute({ email: 'valid@example.com', password: 'wrongpassword' })).rejects.toThrowError(InvalidCredentialError);
    })

    it('should be able authenticate', async ()=> {
        await repository.createUser({ email: 'valid@example.com', name: 'Valid User', password: 'correctpassword' });
        const {user} = await sut.execute({ email: 'valid@example.com', password: 'correctpassword' });
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email', 'valid@example.com');

    })
});