import { PrismaUsersRepository } from "@/repository/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-case/authenticate-use-case";
import { InvalidCredentialError } from "@/use-case/error/invalid-credential-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateSchema.parse(request.body);
    try {
        const repository: PrismaUsersRepository = new PrismaUsersRepository();
        // const repository: UserRepository = new InMemoryUsersRepository();
        const useCase = new AuthenticateUseCase(repository);
        
        const {user} = await useCase.execute({ email, password });
        
        return reply.status(200).send({
        message: 'User authenticated',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }});
    } catch (error) {
        if (error instanceof InvalidCredentialError) {
            return reply.status(400).send({ error: error.message });
        }
        throw error;
    }
}