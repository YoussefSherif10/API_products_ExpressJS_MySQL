const sql = require('./db')
const e = require("express");

const Product = function (product){
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
}

// insert a new product record
Product.create = (newProduct, result) => {
    sql.query("insert into product set ?", newProduct, (err, res) => {
        if (err){
            console.log(err);
            return result(err, null);
        }

        console.log("created product: ", {id: res.insertId, ...newProduct});
        result(null, {id: res.insertId, ...newProduct});
    })
}

// retrieve a record by id
Product.findById = (id, result) => {
    sql.query(`select * from product where id=${id}`, (err, res) => {
        if (err){
            console.log(err);
            return result(err, null);
        }

        if (res.length){
            console.log("found product: ", res[0]);
            return result(null, res[0]);
        }

        result({Kind: 'not_found'}, null);
    })
}

Product.getAll = (name, result) => {
    let query = "select * from product";
    if (name)
        query += `where name=${name}`;

    sql.query(query, (err, res) => {
        if (err){
            console.log('err: ', err);
            return result(err, null);
        }

        console.log("Products: ", res);
        result(null, res);
    })
}

Product.getCostlyProducts = (price, result) => {
    sql.query(`select * from product where price > ${price}`, (err, res) => {
        if (err){
            console.log(err);
            return result(err, null);
        }

        console.log('products: ', res);
        result(null, res);
    })
}

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE product SET name=?, description=?, price=? WHERE id=?",
        [product.name, product.description, product.price, id],
        (err, res) => {
            if (err){
                console.log(err);
                return result(err, null);
            }

            if (res.affectedRows == 0){
                console.log('not_found')
                return result({Kind: 'not_found'}, null);
            }

            console.log('updated product: ', {id: id, ...product});
            result(null, {id: id, ...product});
        });
}

Product.remove = (id, result) => {
    sql.query('DELETE FROM product WHERE id=?', id, (err, res) => {
        if (err){
            console.log(err);
            return result(err, null);
        }

        if (res.affectedRows == 0){
            console.log('not found');
            return result({Kind: 'not_found'}, null);
        }

        console.log('deleted product with id: ', id);
        result(null, res);
    })
}

Product.removeAll = (result) => {
    sql.query("DELETE FROM product", (err, res) => {
        if (err){
            console.log(err);
            return result(err, null);
        }

        console.log(`deleted ${res.affectedRows} products`);
        result(null, res);
    })
}

module.exports = Product;