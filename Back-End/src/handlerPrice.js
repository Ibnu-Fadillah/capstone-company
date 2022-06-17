/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const prices = require('./prices');

function number_range (start, end, intv) {
    let save = []
    sum = 0
    diff = (end  - start ) / intv;
    for (let i = 0; i < intv; i++){
        save[i] = parseFloat((start + diff * i).toFixed(2));
        sum++;
    }
    save[sum-1] = end;
    return save;
  }

const formulaOptim = (request, h) => {
    const { 
        ProductName, Cost,
    } = request.payload;
    
    if (ProductName === undefined || ProductName == '') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan Produk. Mohon isi nama Produk',
        });
        response.code(400);
        return response;
    }

    const newPrice = {
        ProductName, Cost,
    };
    prices.push(newPrice);
    const isSuccess = prices.filter((price) => price.ProductName === ProductName).length > 0;

    // const data_product = require('../data_export.json'); 
    const data_product = require('../export.json');

    const result = data_product.filter((data_product) => data_product.ProductName === ProductName);
    minimum_price = result[0].Min_Price;
    maximum_price = result[0].Max_Price;
    intercept_coefi = result[0].Intercept_Coef;
    elasticity_coefi = result[0].Elasticity_Coef;

    save_profit = [];
    sum_data = 0;
    // profit = [];
    for (let i=0; i<result.length; i++){
        profit = []

        Price = []
        Price = number_range(minimum_price, maximum_price, 10)
        Revenue = []
        // assuming a fixed cost
        cost = Cost
        
        for (let j=0; j<Price.length; j++){
            quantity_demanded = intercept_coefi - elasticity_coefi * Price[j]
            // profit function
            Revenue[j] = (Price[j]-cost) * quantity_demanded;
        }
        // create data frame of price and revenue
        profit[i] = {"Price": Price, "Revenue": Revenue};
        save_profit[sum_data] = profit[i];
        
        sum_data++;
    }
    for (let data=0; data<save_profit[0]['Price'].length; data++){
        if(Math.max(...save_profit[0]['Revenue']) == save_profit[0]['Revenue'][data]){
            simpan_profit = {
                'max_profit':parseFloat(Math.max(...save_profit[0]['Revenue']).toFixed(2)),    
                'max_price_profit':parseFloat(save_profit[0]['Price'][data].toFixed(2)),     
        }
        }
    }

    const response = h.response({
        status: 'success',
        message: 'Harga Berhasil',
        simpan_profit,
      });
      response.code(200);
      return response;
      
};


const coba = (request, h) => {
    const data_product = require('../export.json');

    save_profit = [];
    sum_data = 0;
    // profit = [];
    for (let i=0; i<data_product.length; i++){
        // min_price = data['Min_Price']
        profit = []
        min_price = data_product[i]['Min_Price'];
        max_price = data_product[i]['Max_Price'];
        // max_price = data['Max_Price']
        Price = []
        Price = number_range(min_price, max_price, 10)
        Revenue = []
        // assuming a fixed cost
        cost = 20/100*min_price
        
        for (let j=0; j<data_product.length; j++){
            quantity_demanded = data_product[j]['Intercept_Coef'] - data_product[j]['Elasticity_Coef'] * Price[j]
            // profit function
            Revenue[j] = (Price[j]-cost) * quantity_demanded;
        }
        // create data frame of price and revenue
        profit[i] = {"Price": Price, "Revenue": Revenue};
        save_profit[sum_data] = profit[i];
        
        sum_data++;
    }
    for (let data=0; data<save_profit[0]['Price'].length; data++){
        if(Math.max(...save_profit[0]['Revenue']) == save_profit[0]['Revenue'][data]){
            simpan_profit = {
                'max_profit':parseFloat(save_profit[0]['Revenue'][data].toFixed(2)),    
                'max_price_profit':parseFloat(save_profit[0]['Price'][data].toFixed(2)),     
        }
        }
    }

    const response = h.response({
        status: 'success',
        message: 'Harga Berhasil',
        simpan_profit,
      });
      response.code(200);
      return response;
}

const OptimGetAll = (request, h) => {
    const data_product = require('../data_export.json'); 
    
    const response = h.response({
        status: 'succes',
        message: 'Semua Product ditemukan',
        data_product,
    });
    response.code(200);
    return response;
};

const formulaOptimId = (request, h) => {
    const data_product = require('../data_export.json'); 
    
    const { id } = request.params;
    
    const result = data_product.filter((data_product) => data_product.ProductName === id);
    
    if (result !== undefined) {
        return {
        status: 'success',
        result,
      };
    }
    const response = h.response({
        status: 'fail',
        message: 'Product tidak ditemukan',
        result,
    });
    response.code(404);
    return response;
};

module.exports = { 
    OptimGetAll,
    formulaOptim,
    formulaOptimId,
    coba,
};