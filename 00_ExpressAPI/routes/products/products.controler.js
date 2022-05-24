import * as productsModel from './products.model.js'

//Handles the /products. Returns all products.
export async function getAllProducts(req, res) {
  console.log('retrieving all products....')
  try {
    let allProducts = await productsModel.getAll()
    res.json(allProducts)
  } catch (error) {
    // RES ERROR
    res.status(400).send(error.message)
  }
}

//Handles the products/:id. Returns specified product.
export async function getProductByID(req, res) {
  console.log('retrieving productID ' + req.params.id + '....')
  try {
    let id = parseInt(req.params.id)
    let product = await productsModel.getByID(id)
    res.json(product)
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message)
  }
}

//Handles the /products/filter/?query for type and category. Returns products with given filter.
export async function getProductsByQuery(req, res) {
  console.log('retrieving product by filter query....')
  try {
    let style = req.query.style
      console.log('style is ' + style)
    let type = req.query.type
      console.log('type is ' + type)
    let featured = req.query.featured
      console.log('featured is ' + featured)
    let price = req.query.price
      console.log('price is ' + price)

    let products = await productsModel.getByQuery(style, type, featured, price)
    res.json(products)
  } catch (error) {
    res.status(404).send(error.message)
  }
}
