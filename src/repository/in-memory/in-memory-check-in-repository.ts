import { Prisma, CheckIn } from "generated/prisma";
import CheckInRepository from "../check-in-repository";

export class InMemoryCheckInRepository implements CheckInRepository {
    
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            id: crypto.randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
            updatedAt: new Date(),
            validatedAt: null
        };
        
        return checkIn;
    }

}