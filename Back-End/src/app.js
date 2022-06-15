/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./routes'); 
const PORT = parseInt(process.env.PORT) || 8080;
const init = async () => {
    const server = Hapi.server({
        port: PORT,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['*'],
          },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();