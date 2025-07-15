import UserRepository from "@/repository/user-repository";
import { CheckIn } from "generated/prisma";
import ResourceNotFoundError from "./error/resource-not-found-error";
import GymRepository from "@/repository/gym-repository";
import CheckInRepository from "@/repository/check-in-repository";
import { getDistanceBetweenCoordinates } from "@/util/get-difference-between-two-distances";
import { InvalidDistanceCheckInError } from "./error/invalid-distance-check-in";
import { MaxNumberOfCheckInsError } from "./error/max-number-check-in";

export interface CheckInUseCaseRequest{
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number,
}


export interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(
        private userRepository: UserRepository,
        private gymRepository: GymRepository,
        private checkInRepository: CheckInRepository
    ){}

    async execute({userId, gymId, userLatitude, userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        
        const user = await this.userRepository.getUserById(userId)
        const gym = await this.gymRepository.getGymById(gymId)

        if(!user){
            throw new ResourceNotFoundError()
        }


        if(!gym){
            throw new ResourceNotFoundError()
        }

        const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())
        if(checkInOnSameDate){
            throw new MaxNumberOfCheckInsError()
        }

        // calculate distance between user and gym
        const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        {
            latitude: gym.latitude,
            longitude: gym.longitude,
        },
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
        throw new InvalidDistanceCheckInError()
        }

        const checkIn = await this.checkInRepository.create({
            userId: user.id, 
            gymId: gym.id
        })

        return {
            checkIn
        }


    }
}