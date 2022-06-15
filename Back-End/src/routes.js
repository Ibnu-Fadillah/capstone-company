const { 
    addProductHandler, 
    getAllProductsHandler, 
    getProductByIdHandler, 
    editProductByIdHandler,
    deleteProductByIdHandler,
} = require('./handler');


const routes = [
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