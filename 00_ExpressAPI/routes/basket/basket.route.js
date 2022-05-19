import express from "express";
import {
  deleteProduct,
  getBasketByCustomerId,
  postBasket,
  putBasket,
} from "./basket.controler.js";

export const basketRouter = express.Router();

// MIDDLEWARE
basketRouter.use(express.json());

basketRouter.get("/basket/:customerId", getBasketByCustomerId);
basketRouter.post("/basket/:customerId", postBasket);
basketRouter.put("/basket/:customerId/", putBasket);
basketRouter.delete("/basket/:customerId/", deleteProduct);
