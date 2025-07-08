import { Prisma, Gym } from "generated/prisma";
import GymRepository from "../gym-repository";
import { randomUUID } from "node:crypto";

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

}