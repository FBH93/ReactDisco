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
