import { Router } from "express";
import cartsViewController from "../controllers/carts.view.controller.js";
import { isAuthenticated, handlePolicies, isCartFromUser } from "../middlewares/policies-checker.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/:cid", isAuthenticated, handlePolicies(["USER"], true), isCartFromUser,
    cartsViewController.getCartById);

export default cartsViewRouter;