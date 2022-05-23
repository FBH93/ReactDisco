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
  let index = findCustomerByID(customersArray, customerId);
  if (index === -1)
    throw new Error(`No Customer exist with this id ${customerId}`);
  else return customersArray[index];
}

// GET INDEX IN ARRAY GIVEN ID
function findCustomerByID(customersArray, customerId) {
  return customersArray.findIndex(
    (customers) => customers.customerId === customerId
  );
}

export async function getByEmail(email) {
  let customersArray = await getAll();
  let index = findCustomerByEmail(customersArray, email);
  if (index === -1)
    throw new Error(`No Customer exist with this id ${email}`);
  else return customersArray[index];
}

function findCustomerByEmail(customersArray, email) {
  return customersArray.findIndex(
    (customers) => customers.email === email
  );
}

export async function createCustomer(customerId, fname, lname, email, pword, addr) {
  let customersArray = await getAll();
  if (findCustomerByID(customersArray, customerId) !== -1)
    throw new Error(`Customer #${customerId} already has a user`);
  let newCustomer = { customerId: customerId, firstName: fname, lastName: lname, email: email, password: pword, address: addr  };
  customersArray.push(newCustomer);
  await save(customersArray);
}

async function save(customersArray) {
  let customers = JSON.stringify(customersArray);
  await fs.writeFile(CUSTOMER_DB, customers);
}