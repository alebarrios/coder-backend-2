import { Router } from "express";
import productsViewController from "../controllers/products.view.controller.js";
import { isAuthenticated } from "../utils/sessionCheck.js";

const productsViewRouter = Router();

productsViewRouter.get("/", isAuthenticated, productsViewController.getAllProducts);

productsViewRouter.get("/:id", isAuthenticated, productsViewController.getProductById);

export default productsViewRouter;