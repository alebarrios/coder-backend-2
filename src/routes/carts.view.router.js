import { Router } from "express";
import cartsViewController from "../controllers/carts.view.controller.js";
import { isAuthenticated } from "../utils/sessionCheck.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/:cid", isAuthenticated, cartsViewController.getCartById);

export default cartsViewRouter;