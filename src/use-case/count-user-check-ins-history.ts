import CheckInRepository from "@/repository/check-in-repository";

export interface CountCheckInUseCaseRequest{
    userId: string,
}


export interface CountCheckInUseCaseResponse {
    checkIns: number
}

export class CountCheckInUseCase{
    constructor(
        private checkInRepository: CheckInRepository
    ){}

    async execute({userId}: CountCheckInUseCaseRequest): Promise<CountCheckInUseCaseResponse> {
        const checkIns = await this.checkInRepository.countManyCheckInsByUserId(userId)
        return {checkIns}
    }
}