import { Router } from "express";
import productsViewController from "../controllers/products.view.controller.js";
import { isAuthenticated, handlePolicies } from "../middlewares/policies-checker.js";

const productsViewRouter = Router();

productsViewRouter.get("/", isAuthenticated, handlePolicies(["USER", "ADMIN"], true), productsViewController.getAllProducts);
productsViewRouter.get("/:id", isAuthenticated, handlePolicies(["USER", "ADMIN"], true), productsViewController.getProductById);

export default productsViewRouter;