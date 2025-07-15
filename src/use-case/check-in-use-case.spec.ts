import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in-use-case";
import UserRepository from "@/repository/user-repository";
import GymRepository from "@/repository/gym-repository";
import CheckInRepository from "@/repository/check-in-repository";
import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-user-repository";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym-repository";
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-check-in-repository";
import makeCheckInUseCase from "./factory/make-check-in-use-case";
import ResourceNotFoundError from "./error/resource-not-found-error";
import { InvalidDistanceCheckInError } from "./error/invalid-distance-check-in";
import { MaxNumberOfCheckInsError } from "./error/max-number-check-in";

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
        vi.useFakeTimers()
    })

    afterEach(()=> {
        vi.useRealTimers()
    })

    it('Should be able create a checkin', async ()=> {
        const userId = 'user-1'
        const gymId = 'gym-1'

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })
        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890', latitude: -27.2092052, longitude: -49.6401091 })

        const {checkIn} = await sut.execute({ userId, gymId, userLatitude: -27.2092052,
      userLongitude: -49.6401091, })

        expect(checkIn).toHaveProperty('id')
        expect(checkIn.userId).toBe(userId)
        expect(checkIn.gymId).toBe(gymId)
    })

    it('Should not be able create a check in twice times in same day', async ()=> {
        const userId = 'user-1'
        const gymId = 'gym-1'
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0, 0))

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })
        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890',  latitude: -27.2092052, longitude: -49.6401091 })

        await sut.execute({ userId, gymId,userLatitude: -27.2092052,
      userLongitude: -49.6401091, })
        
        await expect(async ()=> {
           await sut.execute({ userId, gymId, userLatitude: -27.2092052,
      userLongitude: -49.6401091, })
        }, ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('Should be able create a check in twice times in different days', async ()=> {
        const userId = 'user-1'
        const gymId = 'gym-1'
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0, 0))

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })
        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890',  latitude: -27.2092052, longitude: -49.6401091 })

        await sut.execute({ userId, gymId, userLatitude: -27.2092052,
      userLongitude: -49.6401091, })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0, 0))
        
        await expect(async()=> {
           await sut.execute({ userId, gymId, userLatitude: -27.2092052,
      userLongitude: -49.6401091, })
        }).toBeTruthy()
    })

        it('Should not be able create a check in an academy far from user', async ()=> {
        const userId = 'user-1'
        const gymId = 'gym-1'
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0, 0))

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })
        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890',  latitude: 0, longitude: 0 })

        await sut.execute({ userId, gymId, userLatitude: -27.2092052,
      userLongitude: -49.6401091, })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0, 0))
        
        await expect(async()=> {
           await sut.execute({ userId, gymId, userLatitude: 0,
      userLongitude: 0, })
        }).rejects.toThrowError(InvalidDistanceCheckInError)
    })

    it('Should not be able to create a checkin for a non-existing user', async ()=> {
        const gymId = 'gym-1'

        await gymRepository.create({ id: gymId, title: 'Gym 1', phone: '1234567890', latitude: -27.2092052, longitude: -49.6401091 })

        await expect(() => sut.execute({ userId: 'non-existing-user', gymId, userLatitude: -27.2092052,
      userLongitude: -49.6401091, })).rejects.toThrowError('Resource not found')
    })

    it('Should not be able to create a checkin for a non-existing gym', async ()=> {
        const userId = 'user-1'

        await userRepository.createUser({ id: userId, email: 'user@email.com', password: 'password', name: 'User 1' })

        await expect(() => sut.execute({ userId, gymId: 'non-existing-gym', userLatitude: -27.2092052,
      userLongitude: -49.6401091, })).rejects.toThrowError(ResourceNotFoundError) 
    })
})