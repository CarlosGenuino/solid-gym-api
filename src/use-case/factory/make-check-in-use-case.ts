import UserRepository from "@/repository/user-repository"
import { CheckInUseCase } from "../check-in-use-case"
import GymRepository from "@/repository/gym-repository"
import CheckInRepository from "@/repository/check-in-repository"

export default function makeCheckInUseCase(userRepository: UserRepository, gymRepository: GymRepository, checkInRepository: CheckInRepository) {
    return new CheckInUseCase(userRepository, gymRepository, checkInRepository)
}