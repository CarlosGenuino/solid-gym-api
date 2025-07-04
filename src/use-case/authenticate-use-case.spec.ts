import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InvalidCredentialError } from "./error/invalid-credential-error";

describe('AuthenticateUseCase', async () => {
    
    it('should throw InvalidCredentialError for invalid credentials to wrong email', async () => {
        const repository = new InMemoryUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(repository);
        await expect(() => authenticateUseCase.execute({ email: 'invalid@example.com', password: 'wrongpassword' }))
            .rejects.toThrowError(InvalidCredentialError);
    });

    it('should throw InvalidCredentialError for invalid credentials to wrong password', async () => {
        const repository = new InMemoryUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(repository);
        await repository.createUser({ email: 'valid@example.com', name: 'Valid User', password: 'correctpassword' });
        await expect(() => authenticateUseCase.execute({ email: 'valid@example.com', password: 'wrongpassword' })).rejects.toThrowError(InvalidCredentialError);
    })

    it('should be able authenticate', async ()=> {
        const repository = new InMemoryUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(repository);
        await repository.createUser({ email: 'valid@example.com', name: 'Valid User', password: 'correctpassword' });
        const {user} = await authenticateUseCase.execute({ email: 'valid@example.com', password: 'correctpassword' });
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email', 'valid@example.com');

    })
});