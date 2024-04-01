import { FastifyRequest, FastifyReply } from "fastify"
import { ListCustomersServices } from "../services/ListCustomersServices"


class ListCustomersController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listCustomerService = new ListCustomersServices();

        const customers = await listCustomerService.execute();

        reply.send(customers);
        
    }
}

export { ListCustomersController }