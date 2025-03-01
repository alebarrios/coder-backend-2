import express from "express";
import cartsController from "../controllers/carts.controller.js";
import { handlePolicies } from "../middlewares/policies-checker.js";
import { jwtAuth } from "../middlewares/passportJwtAuth.js";

const cartsRouter = express.Router();

cartsRouter.get('/:cid', jwtAuth, handlePolicies(["USER"]), cartsController.getProductsByCartId)

cartsRouter.post('/', jwtAuth, handlePolicies(["USER"]), cartsController.postCart)
cartsRouter.post('/:cid/product/:pid', jwtAuth, handlePolicies(["USER"]), cartsController.postProductInCart)

cartsRouter.put('/:cid', jwtAuth, handlePolicies(["USER"]), cartsController.putProductsInCart)
cartsRouter.put('/:cid/products/:pid', jwtAuth, handlePolicies(["USER"]), cartsController.setQuantityOfProductsInCart)

cartsRouter.delete('/:cid/products/:pid', jwtAuth, handlePolicies(["USER"]), cartsController.deleteProductFromCart)
cartsRouter.delete('/:cid', jwtAuth, handlePolicies(["USER"]), cartsController.deleteAllProductsFromCart)

export default cartsRouter;