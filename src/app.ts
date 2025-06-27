import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";

export const app = fastify()

app.post('/users', async (request, reply) => {
    const userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = userSchema.parse(request.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return reply.status(409).send({ error: 'User already exists' });
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    })

    return reply.status(201).send({
        message: 'User created successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    });
})