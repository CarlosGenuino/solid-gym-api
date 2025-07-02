import { PrismaUsersRepository } from "@/repository/prisma/prisma-user-repository";
import UserAlreadyExistsError from "@/use-case/error/user-already-exists-error";
import { RegisterUseCase } from "@/use-case/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = userSchema.parse(request.body);
    try {
        const repository: PrismaUsersRepository = new PrismaUsersRepository();
        // const repository: UserRepository = new InMemoryUsersRepository();
        const useCase = new RegisterUseCase(repository);
        
        const user = await useCase.execute({ name, email, password });
        
        return reply.status(201).send({
        message: 'User created successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }});
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(400).send({ error: error.message });
        }
        throw error;
    }
}