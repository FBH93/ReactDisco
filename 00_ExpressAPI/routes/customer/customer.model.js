import * as fs from "fs/promises";
const CUSTOMER_DB = "./data/customer.json";

export async function getAll() {
  try {
    let customerRaw = await fs.readFile(CUSTOMER_DB);
    let customer = JSON.parse(customerRaw);
    return customer;
  } catch (err) {
    if (err.code === "ENOENT") {
      // DATA NOT FOUND
      await save([]); // CREATE EMPTY DATA ARRAY
      return []; // RETURN EMPTY DATA ARRAY
    } // ERROR
    else throw err;
  }
}

// GET CUSTOMER BY ID
export async function getById(customerId) {
  let customersArray = await getAll();
  let index = findCustomer(customersArray, customerId);
  if (index === -1)
    throw new Error(`No Customer exist with this id ${customerId}`);
  else return customersArray[index];
}

// GET INDEX IN ARRAY GIVEN ID
function findCustomer(customersArray, customerId) {
  return customersArray.findIndex(
    (customers) => customers.customerId === customerId
  );
}
