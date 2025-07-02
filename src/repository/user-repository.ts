import { Prisma, User } from "generated/prisma";

export default interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: Prisma.UserCreateInput): Promise<User>;
}