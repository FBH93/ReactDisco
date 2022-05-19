import express from "express";
import { getAllCat, getCategoriesByName } from "./categories.controler.js";

export const categoriesRouter = express.Router();

// MIDDLEWARE
categoriesRouter.use(express.json());

categoriesRouter.get("/categories", getAllCat);
categoriesRouter.get("/categories/:name", getCategoriesByName);
