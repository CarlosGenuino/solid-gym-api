import { User } from "generated/prisma";
import UserRepository from "../user-repository";




export class InMemoryUsersRepository implements UserRepository {
    public users: User[] = [];

    async createUser(data: User) {
        this.users.push(data);
        return data;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }

}