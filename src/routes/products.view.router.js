import { Router } from "express";
import productsViewController from "../controllers/products.view.controller.js";
import { isAuthenticated, handlePolicies } from "../middlewares/policies-checker.js";

const productsViewRouter = Router();

productsViewRouter.get("/", isAuthenticated, handlePolicies(["USER", "ADMIN"], true), productsViewController.getAllProducts);
productsViewRouter.get("/new", isAuthenticated, handlePolicies(["ADMIN"], true), productsViewController.showNewProductForm);
productsViewRouter.get("/:id", isAuthenticated, handlePolicies(["USER", "ADMIN"], true), productsViewController.getProductById);

productsViewRouter.post("/", isAuthenticated, handlePolicies(["ADMIN"], true), productsViewController.postProduct);

productsViewRouter.delete("/:id", isAuthenticated, handlePolicies(["ADMIN"], true),
productsViewController.deleteProduct);

export default productsViewRouter;