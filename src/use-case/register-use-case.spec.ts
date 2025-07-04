import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register-use-case";
import { comparePasswords } from "@/util/hash";
import makeRegisterUseCase from "./factory/make-register-use-case";

let sut: RegisterUseCase

describe("Register Use Case", async () => {

  beforeEach(() => {
    sut = makeRegisterUseCase()
  })
  it("should be able to register a user", async () => {
    
    const user = await sut.execute({
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
    const email = "john.doe@example.com";
    await sut.execute({
      name: "Jane Doe",
      email,
      password: "123456",
    });

    await expect(
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toThrowError(`User with email ${email} already exists.`);
  });
});
