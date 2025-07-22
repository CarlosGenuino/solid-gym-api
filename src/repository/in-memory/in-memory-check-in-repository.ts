import { Prisma, CheckIn } from "generated/prisma";
import CheckInRepository from "../check-in-repository";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInRepository {
    
    public items: CheckIn[]= []

    async findManyByUserId(userId: string, page: number): Promise<Array<CheckIn>> {
        return this.items.filter(item => item.userId == userId).slice((page - 1) * 20, page * 20)
    }

    async countManyCheckInsByUserId(userId: string){
        const count = this.items.filter(item => item.userId == userId).length
        return count
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        
        const checkInOnSameDate = this.items.find((checkin)=> {
            const checkInDate = dayjs(checkin.createdAt)
            const isSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            return checkin.userId == userId && isSameDate
        })
        return checkInOnSameDate ? checkInOnSameDate: null
    }
    
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            id: crypto.randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
            updatedAt: new Date(),
            validatedAt: null
        };
        this.items.push(checkIn)
        return checkIn;
    }

}