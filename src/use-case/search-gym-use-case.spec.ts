import GymRepository from "@/repository/gym-repository"
import SearchGymUseCase from "./search-gym-use-case"
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym-repository"
import { beforeEach, describe, expect, it } from "vitest"

let sut: SearchGymUseCase
let repository: GymRepository

describe('Search Gym by Query Use Case', ()=> {
    beforeEach(()=> {
        repository = new InMemoryGymRepository()
        sut = new SearchGymUseCase(repository)
    })

    it('should return a list of gyms by query', async ()=> {
        
        await repository.create({title: 'Veloso', phone: '1234567890', latitude: -27.2092052, longitude: -49.6401091 })
        await repository.create({title: 'Veloso RJ', phone: '1234567890', latitude: -27.2092052, longitude: -49.6401091 })
        
        let result = await sut.execute({query: 'RJ', page: 1})

        expect(result.gyms.length).toBe(1)

        result = await sut.execute({query: 'Veloso', page: 1})

        expect(result.gyms.length).toBe(2)
    })
})