import { CheckIn, Prisma } from "generated/prisma"

export default interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}