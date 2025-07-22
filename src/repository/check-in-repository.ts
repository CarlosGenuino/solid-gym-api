import { CheckIn, Prisma } from "generated/prisma"

export default interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page?: number): Promise<Array<CheckIn>>
    countManyCheckInsByUserId(userId: string): Promise<number>
}