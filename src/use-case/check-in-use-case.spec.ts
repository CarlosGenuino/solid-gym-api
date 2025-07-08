import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in-use-case";
import UserRepository from "@/repository/user-repository";
import GymRepository from "@/repository/gym-repository";
import CheckInRepository from "@/repository/check-in-repository";
import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym-repository";
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-check-in-repository";
import makeCheckInUseCase from "./factory/make-check-in-use-case";

let sut: CheckInUseCase
let userRepository: UserRepository
let gymRepository: GymRepository
let checkInRepository: CheckInRepository
describe("Check-in Use Case", async ()=> {
    beforeEach(()=> {
        userRepository =  new InMemoryUsersRepository()
        gymRepository = new InMemoryGymRepository()
        checkInRepository = new InMemoryCheckInRepository()
        sut = makeCheckInUseCase(userRepository, gymRepository, checkInRepository)
    })

    it('Should be able create a checkin', async ()=> {
        const userId = 'user-1'
        const gymId = 'gym-1'

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })
        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890', latitude: 0, longitude: 0 })

        const {checkIn} = await sut.execute({ userId, gymId })

        expect(checkIn).toHaveProperty('id')
        expect(checkIn.userId).toBe(userId)
        expect(checkIn.gymId).toBe(gymId)
    })

    it('Should not be able to create a checkin for a non-existing user', async ()=> {
        const gymId = 'gym-1'

        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890', latitude: 0, longitude: 0 })

        await expect(() => sut.execute({ userId: 'non-existing-user', gymId })).rejects.toThrowError('Resource not found')
    })

    it('Should not be able to create a checkin for a non-existing gym', async ()=> {
        const userId = 'user-1'

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })

        await expect(() => sut.execute({ userId, gymId: 'non-existing-gym' })).rejects.toThrowError('Resource not found') 
    })
})