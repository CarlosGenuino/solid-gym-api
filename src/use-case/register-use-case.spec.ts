import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register-use-case";
import { comparePasswords } from "@/util/hash";


describe("Register Use Case", async () => {
  it("should be able to register a user", async () => {
    const repository = new InMemoryUsersRepository();
    const useCase = new RegisterUseCase(repository);

    const user = await useCase.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    const hashedPassword = comparePasswords(user.password, "123456");

    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
    expect(hashedPassword).toBeTruthy();
  });

  it("should not be able to register a user with an existing email", async () => {
    const repository = new InMemoryUsersRepository();
    const useCase = new RegisterUseCase(repository);
    const email = "john.doe@example.com";
    await useCase.execute({
      name: "Jane Doe",
      email,
      password: "123456",
    });

    await expect(
      useCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toThrowError(`User with email ${email} already exists.`);
  });
});
