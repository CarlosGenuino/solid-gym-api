import { Prisma, User } from "generated/prisma";
import UserRepository from "../user-repository";
import { hashPassword } from "@/util/hash";




export class InMemoryUsersRepository implements UserRepository {
    public users: User[] = [];

    async createUser(data: Prisma.UserCreateInput) {
        const user = { 
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            email: data.email,
            password: await hashPassword(data.password),
            createdAt: new Date(),
            updatedAt: new Date()
         };
        this.users.push(user);
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }

}