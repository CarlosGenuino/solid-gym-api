import CheckInRepository from "@/repository/check-in-repository"
import GetUserMetricsUseCase from "./get-user-metrics"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-check-in-repository"

let sut: GetUserMetricsUseCase
let checkInRepository: CheckInRepository

describe('User Metrics Use Case', ()=> {
    beforeEach(()=> {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInRepository)
    })

    it('should return the count of checkins by user', async ()=> {
        const userId = 'user-id'
        for (let i = 1; i<= 22; i++){
            await checkInRepository.create({
                gymId: 'gym-id-'+ i,
                userId,
            })
        }

        const {checkInsCount} = await sut.execute({userId})
        expect(checkInsCount).toBe(22)
    })
})