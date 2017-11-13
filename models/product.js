const pool = require('../config/db-connection-postgres');
let Product = {};

Product.all = async cb => {

  try {
    const result = await pool.query("SELECT * FROM product ORDER BY product_id")
    return cb(null, result.rows);
  } catch (err) {
    console.log(err.stack)
    return cb(err);
  }

}


Product.findById = async (id, cb) => {

  try {
    const result = await pool.query("SELECT * FROM product WHERE product_id = $1", [id])
    return cb(null, result.rows);
  } catch (err) {
    console.log(err.stack)
    return cb(err);
  }

}

Product.insert = async (product, cb) => {

  const query = {
    text: `INSERT INTO product(
                  product_id, description, brand, flavor, expiration_date, 
                  sale_price, buy_price, existence, max, min) 
               
            VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)`,

    values: [product.description, product.brand, product.flavor,
    product.expiration_date, product.sale_price, product.buy_price,
    product.existence, product.max, product.min],
  }

  try {
    const result = await pool.query(query)
    return cb(null, result.rows);
  } catch (err) {
    console.log(err.stack)
    return cb(err);
  }

}

Product.update = async (product, cb) => {

  const query = {
    text: `UPDATE product SET description = $1, brand = $2, flavor = $3, expiration_date = $4, sale_price = $5, 
                  buy_price = $6, existence = $7, max = $8, min = $9 WHERE product_id = $10`,

    values: [product.description, product.brand, product.flavor, product.expiration_date,
             product.sale_price, product.buy_price, product.existence, product.max, product.min,
             product.product_id],
  }

  try {
    const result = await pool.query(query)
    return cb(null, result.rows);
  } catch (err) {
    console.log(err.stack)
    return cb(err);
  }



}

Product.remove = async (id, cb) => {

  try {
    const result = await pool.query('DELETE FROM product WHERE product_id = $1', [id])
    return cb(null, result.rows);
  } catch (err) {
    console.log(err.stack)
    return cb(err);
  }
}

Product.response = (res, error, data) => {
  if (error) {
    res.status(500).json(error);
  } else
    res.status(200).json(data);
}

module.exports = Product;
