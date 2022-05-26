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
export async function getById(customerID) {
  let customersArray = await getAll();
  let index = findCustomerByID(customersArray, customerID);
  if (index === -1)
    throw new Error(`No Customer exist with this id ${customerID}`);
  else return customersArray[index];
}

// GET INDEX IN ARRAY GIVEN ID
function findCustomerByID(customersArray, customerID) {
  return customersArray.findIndex(
    (customers) => customers.customerID === customerID
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

export async function createCustomer(customerID, fname, lname, email, pword, addr) {
  let customersArray = await getAll();
  if (findCustomerByID(customersArray, customerID) !== -1)
    throw new Error(`Customer #${customerID} already has a user`);
  let newCustomer = { customerID: customerID, firstName: fname, lastName: lname, email: email, password: pword, address: addr  };
  customersArray.push(newCustomer);
  await save(customersArray);
}

async function save(customersArray) {
  let customers = JSON.stringify(customersArray);
  await fs.writeFile(CUSTOMER_DB, customers);
}