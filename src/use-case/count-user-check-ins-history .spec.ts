import { beforeEach, describe, expect, it } from "vitest";
import CheckInRepository from "@/repository/check-in-repository";
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-check-in-repository";
import { CountCheckInUseCase } from "./count-user-check-ins-history";

let sut: CountCheckInUseCase
let checkInRepository: CheckInRepository

describe('Count Check-ins Use Case', ()=> {
    beforeEach(()=> {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CountCheckInUseCase(checkInRepository)
    })

    it('should return a paged list of checkins', async ()=> {
        const userId = 'user-id'
        for (let i = 1; i<= 22; i++){
            await checkInRepository.create({
                gymId: 'gym-id-'+ i,
                userId,
            })
        }

        const {checkIns} = await sut.execute({userId})
        expect(checkIns).toBe(22)
    })
})