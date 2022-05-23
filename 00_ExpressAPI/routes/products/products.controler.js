import * as productsModel from "./products.model.js";

//Handles the /products. Returns all products.
export async function getAllProducts(req, res) {
  try {
    let allProducts = await productsModel.getAll();
    res.json(allProducts);
  } catch (error) {
    // RES ERROR
    res.status(400).send(error.message);
  }
}

//Handles the products/:id. Returns specified product.
export async function getProductByID(req, res) {
  try {
    let id = parseInt(req.params.id);
    let product = await productsModel.getByID(id);
    res.json(product);
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message);
  }
}

//Handles the /products/filter/?query for type and category. Returns products with given filter.
export async function getProductsByQuery(req, res) {
  try {
    console.log(res.query)
    let style = req.query.style;
    let type = req.query.type;
    let featured = req.query.featured;
    let products = await productsModel.getByQuery(style, type, featured);
    res.json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
}
