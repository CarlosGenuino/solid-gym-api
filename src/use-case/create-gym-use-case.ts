import GymRepository from "@/repository/gym-repository";
import { Gym } from "generated/prisma";

export interface CreateGymUseCaseRequest {
    title: string
    phone: string
    latitude: number,
    longitude: number
}

export interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase{
    constructor(private gymRepository: GymRepository){}

    async execute({title, phone, latitude, longitude}: CreateGymUseCaseRequest){
        const gym = await this.gymRepository.create({title, phone, latitude, longitude})
        return {gym}
    }
}