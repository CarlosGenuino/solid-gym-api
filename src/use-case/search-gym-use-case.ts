import GymRepository from "@/repository/gym-repository"
import { Gym } from "generated/prisma"

interface SearchGymUseCaseRequest {
    query: string
    page: number
}


interface SearchGymUseCaseResponse {
    gyms: Array<Gym>
}

export default class SearchGymUseCase{
    constructor(private repository: GymRepository){}

    async execute({query, page}: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse>{
        const gyms = await this.repository.GetGymByQuery(query, page)

        return {
            gyms
        }
    }
}