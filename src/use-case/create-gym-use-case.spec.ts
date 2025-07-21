import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym-use-case";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym-repository";


let sut: CreateGymUseCase

describe("Create Gym Use Case", async () => {

  beforeEach(() => {
    const repository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(repository)
  })
  it("should be able to create a gym", async () => {
    
    const {gym} = await sut.execute({
      title: "John Doe",
      phone: "john.doe@example.com",
      latitude: 0,
      longitude: 0
    });

    expect(gym.id).toBeDefined();
  });
})