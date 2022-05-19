import * as categoriesModel from "./categories.model.js";

//Handles the /products. Returns all products.
export async function getAllCat(req, res) {
  try {
    let allCategories = await categoriesModel.getAll();
    res.json(allCategories);
  } catch (error) {
    // RES ERROR
    res.status(400).send(error.message);
  }
}

//Get all categories (type and categorie) that are evailable
export async function getCategoriesByName(req, res) {
  try {
    let categories = await categoriesModel.getByName(req.params.name);
    res.json(categories);
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message);
  }
}
