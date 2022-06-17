/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./routes'); 
const PORT = parseInt(process.env.PORT) || 8080;
module.exports = {  
  method: 'POST',
  path: '/file-uploads',
  options: {
    payload: {
      maxBytes: 209715200,
      output: 'file',
      parse: true,
      multipart: true     // <-- this fixed the media type error
    }
  }
}
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