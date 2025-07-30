import GymRepository from "@/repository/gym-repository"
import { Gym } from "generated/prisma"

interface FetchNearByGymsRequest {
    user_latitude: number
    user_longitude: number
}


interface FetchNearByGymsResponse {
    gyms: Array<Gym>
}

export default class FetchNearByGymsUseCase{
    constructor(private repository: GymRepository){}

    async execute({user_latitude, user_longitude}: FetchNearByGymsRequest): Promise<FetchNearByGymsResponse> {
        const gyms = await this.repository.getGymsNearUserPosition(user_latitude, user_longitude)

        return {
            gyms
        }
    }
}