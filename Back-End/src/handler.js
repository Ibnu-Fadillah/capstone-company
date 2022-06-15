/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
const { nanoid } = require('nanoid');
const products = require('./products');

//Kriteria 1: API Dapat Menyimpan Products
const addProductHandler = (request, h) => {
    const { 
        ProductName, ProductCategory, Price, Quantity, Cost, Description, Photos,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    if (ProductName === undefined || ProductName == '') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan Produk. Mohon isi nama Produk',
        });
        response.code(400);
        return response;
    }

    const newProduct = {
        id, ProductName, ProductCategory, Price, Quantity, Cost, Description, Photos, insertedAt, updatedAt,
    };
    products.push(newProduct);
    const isSuccess = products.filter((product) => product.id === id).length > 0;
 
    if (isSuccess) {
        const response = h.response({
        status: 'success',
        message: 'Produk berhasil ditambahkan',
        data: {
            ProductId: id, 
            // ProductName: ProductName,
        },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Product gagal ditambahkan',
    });
    response.code(500);
    return response;
};

//Kriteria 2: API Dapat Menampilkan Seluruh Product
const getAllProductsHandler = (request, h) => {
    const { 
        ProductName, 
    } = request.query;
    let productsData = products;

    if (ProductName !== undefined) {
        productsData = productsData.filter((product) => product.ProductName.toLowerCase().includes(ProductName.toLowerCase()));
    }
    
    const response = h.response({
        status: 'success',
        data: {
            products: productsData.map((product) => ({
            id: product.id,
            ProductName: product.ProductName, 
            ProductCategory: product.ProductCategory,
            Price: product.Price,
            Quantity: product.Quantity,
            Cost: product.Cost,
            Description: product.Description,
            Photos: product.Photos,
            insertedAt: product.insertedAt,
            updatedAt: product.updatedAt,
            })),
        },
    });   
    return response;
};

//Kriteria 3: API Dapat Menampilkan Detail Product
const getProductByIdHandler = (request, h) => {
    const { id } = request.params;

    const product = products.filter((product) => product.id === id)[0];
   
    if (product !== undefined) {
        return {
        status: 'success',
        data: {
          product,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Product tidak ditemukan',
    });
    response.code(404);
    return response;
};

//Kriteria 4: API Dapat Mengubah Data Product
const editProductByIdHandler = (request, h) => {
    const { id } = request.params;
    const { 
        ProductName, ProductCategory, Price, Quantity, Cost, Description, Photos,
    } = request.payload;
    // const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = products.findIndex((product) => product.id === id);
   
    if (index !== -1) {
        if (ProductName === undefined || ProductName == '') {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui produk. Mohon isi nama produk',
            });
            response.code(400);
            return response;
        }

        products[index] = {
            ...products[index],
            id,
            ProductName,
            ProductCategory,
            Price,
            Quantity,
            Cost,
            Description,
            Photos,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Produk berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui produk. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Kriteria 5: API Dapat Menghapus Product
const deleteProductByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = products.findIndex((product) => product.id === id);
   
    if (index !== -1) {
      products.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Produk berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Produk gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { 
    addProductHandler, 
    getAllProductsHandler, 
    getProductByIdHandler, 
    editProductByIdHandler,
    deleteProductByIdHandler,
};