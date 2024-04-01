// Importa o pacote Fastify para criação da aplicação web
import Fastify from 'fastify';
// Importa o pacote cors para lidar com política de mesma origem
import cors from '@fastify/cors';
// Importa as rotas definidas no arquivo routes.ts
import { routes } from './routes';

// Inicializa a aplicação Fastify com o logger habilitado para registro de informações sobre o funcionamento da aplicação.
const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message})
})


// Função assíncrona que inicializa a aplicação
const start = async () => {
    // Registra o middleware de CORS na aplicação
    await app.register(cors);
    // Registra as rotas definidas no arquivo routes.ts na aplicação
    await app.register(routes);

    try {
        // Inicia o servidor da aplicação e escuta na porta 3333
        await app.listen({ port :3333})
    } catch(err) {
        // Em caso de erro ao iniciar o servidor, encerra o processo com código de saída 1
        process.exit(1)
    }
}

start();
