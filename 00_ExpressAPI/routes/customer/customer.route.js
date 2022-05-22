import express from "express";
import { getCustomerById, postCustomer } from "./customer.controler.js";

export const customerRouter = express.Router();

//Middelware
customerRouter.use(express.json());

customerRouter.get("/customer/:customerId", getCustomerById);
customerRouter.post("/customer/:customerId", postCustomer);
