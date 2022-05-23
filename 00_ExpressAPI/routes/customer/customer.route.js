import express from "express";
import { getCustomerById, postCustomer, getAllCustomers } from "./customer.controler.js";

export const customerRouter = express.Router();

//Middelware
customerRouter.use(express.json());

customerRouter.get("/customer/:customerId", getCustomerById);
customerRouter.post("/customer/", postCustomer); //Uses Query to create customer
customerRouter.get("/customer/", getAllCustomers)
