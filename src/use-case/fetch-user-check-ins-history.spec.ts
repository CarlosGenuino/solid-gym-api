import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInUseCase } from "./fetch-user-check-ins-history";
import CheckInRepository from "@/repository/check-in-repository";
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-check-in-repository";

let sut: FetchUserCheckInUseCase
let checkInRepository: CheckInRepository

describe('Check-ins history Use Case', ()=> {
    beforeEach(()=> {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInUseCase(checkInRepository)
    })
    it('should list a history of checkins', async ()=> {
        const userId = 'user-id'
        await checkInRepository.create({
            gymId: 'gym-id',
            userId,
            createdAt: new Date(),
        })

        await checkInRepository.create({
            gymId: 'gym2-id',
            userId,
            createdAt: "21-07-2025",
        })
        const {checkIns} = await sut.execute({userId, page: 1})
        expect(checkIns.length).toBe(2)
    })

    it('should return a paged list of checkins', async ()=> {
        const userId = 'user-id'
        for (let i = 1; i<= 22; i++){
            await checkInRepository.create({
                gymId: 'gym-id-'+ i,
                userId,
            })
        }

        const {checkIns} = await sut.execute({userId, page: 1})
        expect(checkIns.length).toBe(20)
    })
})