import CheckInRepository from "@/repository/check-in-repository"

interface GetUserMetricsUseCaseRequest {
    userId: string
}


interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export default class GetUserMetricsUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({userId}:GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount =  await this.checkInRepository.countManyCheckInsByUserId(userId)
        return {
            checkInsCount
        }
    }
}