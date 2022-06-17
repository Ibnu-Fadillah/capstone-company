const { 
    addProductHandler, 
    getAllProductsHandler, 
    getProductByIdHandler, 
    editProductByIdHandler,
    deleteProductByIdHandler,
    index,
} = require('./handler');

const { 
    OptimGetAll,
    formulaOptim,
    formulaOptimId,
    coba,
} = require('./handlerPrice');


const routes = [
    {
        method: 'GET',
        path: '/coba',
        handler: coba,
    },
    {
        method: 'GET',
        path: '/',
        handler: index,
    },
    {
        method: 'GET',
        path: '/formula',
        handler: OptimGetAll,
    },
    {
        method: 'GET',
        path: '/formula/{id}',
        handler: formulaOptimId,
    },
    {
        method: 'POST',
        path: '/formula/post',
        handler: formulaOptim,
    },
    {
        method: 'POST',
        path: '/products/post',
        handler: addProductHandler,
    },
    {
        method: 'GET',
        path: '/products',
        handler: getAllProductsHandler,
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: getProductByIdHandler,
    },
    {
        method: 'PUT',
        path: '/products/{id}/put',
        handler: editProductByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/products/{id}/delete',
        handler: deleteProductByIdHandler,
    },
     
  ];
   
  module.exports = routes;