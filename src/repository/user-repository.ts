import { Prisma, User } from "generated/prisma";

export default interface UserRepository {
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: Prisma.UserCreateInput): Promise<User>;
}