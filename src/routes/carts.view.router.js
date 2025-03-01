import { Router } from "express";
import cartsViewController from "../controllers/carts.view.controller.js";
import { isAuthenticated, handlePolicies } from "../middlewares/policies-checker.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/:cid", isAuthenticated, handlePolicies(["USER"]), cartsViewController.getCartById);

export default cartsViewRouter;