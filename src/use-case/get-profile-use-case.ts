import UserRepository from "@/repository/user-repository";
import { User } from "generated/prisma";
import ResourceNotFoundError from "./error/resource-not-found-error";

export interface GetUserProfileUseCaseRequest {
  userId: string;
}

export interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
        user
    }
  }
}
