const Product = require('../dao/product.dao')

// create a new product
exports.create = (req, res) => {
    // validate the request
    if (!req.body)
        return res.status(400).send({message: 'Content can\'t be empty'});

    // create a new product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    // save the product to the DB
    Product.create(product, (err, data) => {
        if (err)
            return res.status(500).send({message: 'Error occurred while creating the product'});
        res.status(201).send(data);
    })
};

exports.getAll = (req, res) => {
    const name = req.body.name;

    Product.getAll(name, (err, data) => {
        if (err)
            return res.status(500).send({message: 'Error occurred while retrieving the products'});
        res.status(200).send(data);
    })
};

exports.findById = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err){
            if (err.Kind === "not_found")
                return res.status(404).send({message: 'the product not found'});
            else
                return res.status(500).send({message: 'Error occurred while retrieving the product'});
        }

        res.status(200).send(data);
    })
}

exports.getCostlyProducts = (req, res) => {
    Product.getCostlyProducts(req.params.price, (err, data) => {
        if (err)
            return res.status(500).send({message: 'Error occurred while retrieving the products'});
        res.status(200).send(data);
    })
}

exports.updateById = (req, res) => {
    if (!req.body)
        return res.status(400).send({message: 'Content can\'t be empty'});

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    Product.updateById(req.params.id, product, (err, data) => {
        if (err){
            if (err.Kind === 'not_found')
                return res.status(404).send({message: 'not_found'});
            return res.status(500).send({message: 'Error occurred while updating the product'});
        }

        res.status(200).send(data);
    })
};

exports.remove = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.Kind === 'not_found')
                return res.status(404).send({message: 'not_found'});
            return res.status(500).send({message: 'Error occurred while deleting the product'});
        }

        res.status(200).send(data);
    })
}

exports.removeAll = (req, res) => {
    Product.removeAll((err, data) => {
        if (err)
            return res.status(500).send({message: 'Error occurred while deleting the products'});
        res.status(200).send(data);
    })
}