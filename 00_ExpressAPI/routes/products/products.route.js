// index.js
import express from "express";
import {
  getAllProducts,
  getProductByID,
  getProductsByQuery,
} from "./products.controler.js";

export const productsRouter = express.Router();

// MIDDLEWARE
productsRouter.use(express.json());

// HANDLERS
productsRouter.get("/products", getAllProducts);
productsRouter.get("/products/filter/", getProductsByQuery);
productsRouter.get("/products/:id", getProductByID);
