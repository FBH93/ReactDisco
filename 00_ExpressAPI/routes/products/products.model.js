import * as fs from "fs/promises";
const PRODUCTS_DB = "./data/products.json";

// RETURN ALL PRODUCTS FROM DB
export async function getAll() {
  try {
    let productsRaw = await fs.readFile(PRODUCTS_DB);
    let products = JSON.parse(productsRaw);
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      // DATA NOT FOUND
      await save([]); // CREATE EMPTY DATA ARRAY
      return []; // RETURN EMPTY DATA ARRAY
    } // ERROR
    else throw err;
  }
}

// CHECK FOR PRODUCTBYID
function findProduct(productArray, ID) {
  return productArray.findIndex((thisProduct) => thisProduct.productID === ID);
}

// GET PRODUCT_BY_ID
export async function getByID(productID) {
  let productArray = await getAll();
  let index = findProduct(productArray, productID);
  if (index === -1)
    throw new Error(`Product with ID: ${productID} does not exist!`);
  else return productArray[index];
}

//GET PRODUCT_BY_FILTER
export async function getByQuery(style, type) {
  let productArray = await getAll();
  let filteredArray;
  //Check if style and type are both filled in. Filters on both.
  if (style && type) {
    filteredArray = productArray
      .filter((a) => a.style == style)
      .filter((b) => b.type == type);
  }
  //Check if type is filled in, but style is not.
  else if (type && style === undefined) {
    filteredArray = productArray.filter((b) => b.type == type);
  }
  //Else we assume style is filled in and type is not.
  else {
    filteredArray = productArray.filter((a) => a.style == style);
  }
  //Check if any products are returned. Error if none.
  if (filteredArray.length <= 0) {
    throw new Error(`There are no products with this filter!`);
  }
  return filteredArray;
}