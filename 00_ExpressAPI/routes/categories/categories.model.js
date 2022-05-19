import * as fs from "fs/promises";
const CATEGORY_DB = "./data/category.json";

// RETURN ALL CATEGORIES FROM DB
export async function getAll() {
  try {
    let categoriesRaw = await fs.readFile(CATEGORY_DB);
    let categories = JSON.parse(categoriesRaw);
    return categories;
  } catch (err) {
    if (err.code === "ENOENT") {
      // DATA NOT FOUND
      await save([]); // CREATE EMPTY DATA ARRAY
      return []; // RETURN EMPTY DATA ARRAY
    } // ERROR
    else throw err;
  }
}

// GET CATEGORIES BY NAME
export async function getByName(name) {
  let categoriesArray = await getAll();
  let index = findCategory(categoriesArray, name);
  if (index === -1)
    throw new Error(`No Categories exist with this name ${name}`);
  else return categoriesArray[index];
}

// GET INDEX IN ARRAY GIVEN NAME
function findCategory(categoriesArray, name) {
  return categoriesArray.findIndex((categories) => categories.name === name);
}
