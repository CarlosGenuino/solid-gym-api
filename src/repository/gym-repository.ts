import { Gym, Prisma } from "generated/prisma";

export default interface GymRepository {
    getGymsNearUserPosition(user_latitude: number, user_longitude: number): Promise<Array<Gym>>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    getGymById(gymId: string): Promise<Gym | null>
    GetGymByQuery(query:string, page: number): Promise<Array<Gym>>
}