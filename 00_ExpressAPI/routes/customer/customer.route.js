import express from "express";
import { getCustomerById, postCustomer, getAllCustomers, getCustomerByEmail } from "./customer.controler.js";

export const customerRouter = express.Router();

//Middelware
customerRouter.use(express.json());

customerRouter.get("/customer/:customerId", getCustomerById);
customerRouter.post("/customer/", postCustomer);
customerRouter.get("/customer/", getAllCustomers);
customerRouter.get("/customer/login/:email", getCustomerByEmail);
