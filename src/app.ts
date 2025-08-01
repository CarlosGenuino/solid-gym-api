import fastify from "fastify";
import { routes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify()
app.register(routes);

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            issues: error.format(),
        });
    }

    if (env.NODE_ENV != 'prod'){
        console.error(error)
    }else {
        //TODO: integrar com alguma ferramenta de observabilidade
    }

    return reply.status(500).send({
        message: "Internal server error"
    });
})