// Importa tipos específicos do Fastify para uso nas rotas
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";

// Exporta uma função async que define as rotas da aplicação
export async function routes (fastify: FastifyInstance, options: FastifyPluginOptions){

    // Define uma rota GET "/teste" que retorna um objeto { ok: true }
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    });

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })

    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply)
    })

    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })
}
