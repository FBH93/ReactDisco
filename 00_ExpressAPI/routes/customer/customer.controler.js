import * as customerModel from "./customer.model.js"

// Get customer by id
export async function getCustomerById(req, res) {
  try {
    let customer = await customerModel.getById(req.params.customerID)
    res.json(customer)
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message)
  }
}

export async function postCustomer(req, res) {
  try {
    let customerId = req.body.customerID
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let pword = req.body.pword
    let addr = req.body.addr
    console.log(fname)
    await customerModel.createCustomer(
      customerId,
      fname,
      lname,
      email,
      pword,
      addr
    )
    res.status(201).send("")
    res.end()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getAllCustomers(req, res) {
  try {
    let allCustomers = await customerModel.getAll()
    res.json(allCustomers)
  } catch (error) {
    // RES ERROR
    res.status(400).send(error.message)
  }
}

export async function getCustomerByEmail(req, res) {
  try {
    let customer = await customerModel.getByEmail(req.params.email)
    res.json(customer)
  } catch (error) {
    // RES ERROR
    res.status(404).send(error.message)
  }
}
