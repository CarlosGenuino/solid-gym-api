import { Gym, Prisma } from "generated/prisma";

export default interface GymRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    getGymById(gymId: string): Promise<Gym | null>
}