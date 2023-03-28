const express = require("express");
module.exports = app => {
    const product = require('../controllers/product.controller')

    let router = express.Router();

    // create new product
    router.post('/', product.create);

    // retrieve all products
    router.get('/', product.getAll);

    // retrieve all costly products
    router.get('/price/:price', product.getCostlyProducts);

    // retrieve a single product with id
    router.get('/:id', product.findById);

    // update a product by id
    router.put('/:id', product.updateById);

    // delete a product
    router.delete('/:id', product.remove);

    // delete all products
    router.delete('/', product.removeAll);

    app.use('/api/product', router);
};