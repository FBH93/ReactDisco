import * as customerModel from "./customer.model.js";

// Get customer by id
export async function getCustomerById(req, res) {
  try {
    let customer = await customerModel.getById(req.params.customerId);
    res.json(customer);
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message);
  }
}

export async function postCustomer(req, res) {
  try {
    let customerId = req.query.customerID;
    let fname = req.query.fname
    let lname = req.query.lname
    let email = req.query.email
    let addr = req.query.addr
    await customerModel.createCustomer(customerId, fname, lname, email, addr);
    res.status(201).send('');
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}
