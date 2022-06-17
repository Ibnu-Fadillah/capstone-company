const products = require('../products');
const { 
    newPostRef,
} = require('./firebase');
// var firebase = require("firebase/app");
// const { getDatabase } = require("firebase/database");

function addFirebase(ProductId, ProductName, ProductCategory, Price, Quantity, Cost, Description, Photos, insertedAt, updatedAt){
    
    set(newPostRef, {
        ProductId: ProductId,
        ProductName: ProductName,
        ProductCategory: ProductCategory,
        Price: Price,
        Quantity: Quantity,
        Cost: Cost,
        Description: Description,
        Photos: Photos,
        insertedAt: insertedAt,
        updatedAt: updatedAt,
    });
};

function updateFirebase() {
    const newData = {
        ProductId: ProductId,
        ProductName: ProductName,
        ProductCategory: ProductCategory,
        Price: Price,
        Quantity: Quantity,
        Cost: Cost,
        Description: Description,
        Photos: Photos,
        updatedAt: updatedAt,
    };
    rootRef.child(ProductId).update(newData);
};

function removeFirebase() {
    rootRef.child(ProductId).remove()   
};

module.exports = { 
    addFirebase, 
    updateFirebase,
    removeFirebase,
};