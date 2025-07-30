import { Prisma, Gym } from "generated/prisma";
import GymRepository from "../gym-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/util/get-difference-between-two-distances";

const academias: Gym[] = []

export class InMemoryGymRepository implements GymRepository {
   
    
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const academia = {
            id: data.id || randomUUID(),
            title: data.title,
            latitude: data.latitude,
            longitude: data.longitude,
            phone: (data.phone != undefined ? data.phone: null),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        academias.push(academia);
        return academia
    }
    
    async getGymById(gymId: string): Promise<Gym | null> {
        const academia = academias.find((gym) => gym.id === gymId);
        return academia || null;
    }

    async GetGymByQuery(query: string, page: number): Promise<Array<Gym>> {
        return academias.filter(a => a.title.includes(query)).slice((page -1) * 20, page * 20)
    }

     async getGymsNearUserPosition(user_latitude: number, user_longitude: number): Promise<Array<Gym>> {
        return academias.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: user_latitude, longitude: user_longitude},
                {
                latitude: item.latitude,
                longitude: item.longitude,
                },
            )

            return distance < 10
        })
    }
    

}