import { CheckIn } from "generated/prisma";
import CheckInRepository from "@/repository/check-in-repository";

export interface FetchUserCheckInUseCaseRequest{
    userId: string,
    page?: number
}


export interface FetchUserCheckInUseCaseResponse {
    checkIns: Array<CheckIn>
}

export class FetchUserCheckInUseCase{
    constructor(
        private checkInRepository: CheckInRepository
    ){}

    async execute({userId, page}: FetchUserCheckInUseCaseRequest): Promise<FetchUserCheckInUseCaseResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
        return {checkIns}
    }
}