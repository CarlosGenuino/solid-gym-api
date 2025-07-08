import UserRepository from "@/repository/user-repository";
import { CheckIn } from "generated/prisma";
import ResourceNotFoundError from "./error/resource-not-found-error";
import GymRepository from "@/repository/gym-repository";
import CheckInRepository from "@/repository/check-in-repository";

export interface CheckInUseCaseRequest{
    userId: string,
    gymId: string
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

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        
        const user = await this.userRepository.getUserById(userId)
        const gym = await this.gymRepository.getGymById(gymId)

        if(!user){
            throw new ResourceNotFoundError()
        }


        if(!gym){
            throw new ResourceNotFoundError()
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