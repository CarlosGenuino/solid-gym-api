import GymRepository from "@/repository/gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import FetchNearByGymsUseCase from "./fetch-near-by-gyms";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym-repository";

let sut: FetchNearByGymsUseCase
let repository: GymRepository


describe('Feach Gym Near By user', ()=> {
    
    beforeEach(()=> {
        repository = new InMemoryGymRepository()
        sut = new FetchNearByGymsUseCase(repository)
    })

    it('Should be able list gyms near by user position', async ()=> {
        await repository.create({title: 'Veloso', phone: '1234567890', latitude: -27.2092052, longitude: -49.6401091 })
        await repository.create({title: 'Veloso RJ', phone: '1234567890', latitude: -27.2092052, longitude: -49.6401091 })
        
        let result = await sut.execute({user_latitude: -27.2092052, user_longitude:  -49.6401091})

        expect(result.gyms.length).toBe(2)

        result = await sut.execute({user_latitude: 0, user_longitude:  0})

        expect(result.gyms.length).toBe(0)

    })
})