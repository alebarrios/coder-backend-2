import { Router } from "express";
import cartsViewController from "../controllers/carts.view.controller.js";
import { isAuthenticated, handlePolicies, isCartFromUser } from "../middlewares/policies-checker.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/:cid", isAuthenticated, handlePolicies(["USER"], true), isCartFromUser,
    cartsViewController.getCartById);

cartsViewRouter.post('/:cid/purchase', isAuthenticated, handlePolicies(["USER"]), isCartFromUser,
    cartsViewController.purchaseCart);

cartsViewRouter.post('/:cid/product/:pid', isAuthenticated, handlePolicies(["USER"]), isCartFromUser,
    cartsViewController.addProductToCart);

cartsViewRouter.delete('/:cid', isAuthenticated, handlePolicies(["USER"]), isCartFromUser,
    cartsViewController.removeAllProductsFromCart);

export default cartsViewRouter;