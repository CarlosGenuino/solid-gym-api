import { FastifyInstance } from "fastify";
import { register } from "./controller/register";
import { authenticate } from "./controller/authenticate";

export async function routes(app: FastifyInstance) {
    app.post('/users', register)

    app.post('/sessions', authenticate)
}