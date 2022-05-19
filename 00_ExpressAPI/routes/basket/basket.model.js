import * as fs from "fs/promises";
import { getByID } from "../products/products.model.js";

const BASKET_DB = "./data/basket.json";

// RETURN ALL BASKETS FROM DB
export async function getAll() {
  try {
    let basketRaw = await fs.readFile(BASKET_DB);
    let basket = JSON.parse(basketRaw);
    return basket;
  } catch (err) {
    if (err.code === "ENOENT") {
      // DATA NOT FOUND
      await save([]); // CREATE EMPTY DATA ARRAY
      return []; // RETURN EMPTY DATA ARRAY
    } // ERROR
    else throw err;
  }
}

// GET BASKET BY customerId
export async function getByCustomerId(customerId) {
  let basketArray = await getAll();
  let index = findBasket(basketArray, customerId);
  if (index === -1)
    throw new Error(`No basket exist for customer # ${customerId}`);
  else return basketArray[index];
}

// GET INDEX OF BASKET IN ARRAY GIVEN CUSTOMERID
function findBasket(basketArray, customerId) {
  return basketArray.findIndex((basket) => basket.customerId === customerId);
}

// CREATE BASKET
export async function createBasket(customerId) {
  let basketArray = await getAll();
  if (findBasket(basketArray, customerId) !== -1)
    throw new Error(`Customer #${customerId} already has a basket`);
  let newBasket = { customerId: customerId, products: [] };
  basketArray.push(newBasket);
  await save(basketArray);
}

// ADD TO BASKET DATABASE
async function save(basketarray = []) {
  let basket = JSON.stringify(basketarray);
  await fs.writeFile(BASKET_DB, basket);
}

// ADD PRODUCT TO BASKET
export async function addProduct(customerId, productID, size) {
  let basketArray = await getAll();
  let index = findBasket(basketArray, customerId);
  if (index === -1) {
    throw new Error(`Customer #${customerId} doesn't have a basket`);
  } else {
    let newBasket = await updateBasket(basketArray[index], productID, size);
    basketArray[index] = newBasket;
    await save(basketArray);
  }
}

//UPDATE BASKET OF CUSTOMER WITH NEW PRODUCT
async function updateBasket(basket, productID, size) {
  let product = await getByID(productID);

  //Adds the size to the product JSON object.
  product.size = size;

  let newProducts = basket.products;
  newProducts.push(product);
  basket.products = newProducts;
  return basket;
}

// DELETE PRODUCT FROM BASKET
export async function removeProduct(customerId, productID, size) {
  let basketArray = await getAll();
  let index = findBasket(basketArray, customerId);
  let basket = basketArray[index];
  let productIndex = findProduct(basket, productID, size);
  if (index === -1) {
    throw new Error(`Customer #${customerId} doesn't have a basket`);
  } else if (productIndex === -1) {
    throw new Error(`Product #${productID} with #${size} is not in the basket`);
  } else {
    basket.products.splice(productIndex, 1);
    basketArray[index] = basket;
    await save(basketArray);
  }
}
// GET INDEX OF PRODUCT IN ARRAY GIVEN PRODUCTID
function findProduct(basketArray, ID, size) {
  let foundIndex = basketArray.products.findIndex((thisProduct) => thisProduct.productID === ID && thisProduct.size === size);
  return foundIndex;
}