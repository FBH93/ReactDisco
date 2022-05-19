import * as basketModel from "./basket.model.js";

//Get all categories (type and categorie) that are evailable
export async function getBasketByCustomerId(req, res) {
  try {
    let basket = await basketModel.getByCustomerId(req.params.customerId);
    res.json(basket);
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message);
  }
}

export async function postBasket(req, res) {
  try {
    let customerId = req.params.customerId;
    await basketModel.createBasket(customerId);
    res.status(201).send('');
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function putBasket(req, res) {
  try {
    let customerId = req.params.customerId;
    let productID = parseInt(req.query.productID);
    let size = req.query.size;
    if (size == undefined || productID == undefined) {
      res.status(400).send("Size or product is undefined");
      res.end();
    } else {
      await basketModel.addProduct(customerId, productID, size);
      res.end();
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProduct(req, res) {
  try {
    let customerId = req.params.customerId;
    let size = req.query.size;
    let productID = parseInt(req.query.productID);
    await basketModel.removeProduct(customerId, productID, size);
    res.end();
  } catch (error) {
    res.status(404).send(error.message);
  }
}
