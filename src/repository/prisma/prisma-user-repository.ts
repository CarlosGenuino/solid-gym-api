import { prisma } from "@/lib/prisma";
import { Prisma, User } from "generated/prisma";
import UserRepository from "../user-repository";

export class PrismaUsersRepository implements UserRepository {
    
    getUserById(id: string): Promise<User | null> {
        const user = prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    getUserByEmail(email: string): Promise<User | null> {
        const user = prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    createUser(data: Prisma.UserCreateInput) {
        const user = prisma.user.create({
            data
        })

        return user
    }

}