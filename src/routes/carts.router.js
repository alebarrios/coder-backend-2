import express from "express";
import cartsController from "../controllers/carts.controller.js";
import { jwtAuth } from "../utils/sessionCheck.js";

const cartsRouter = express.Router();

cartsRouter.get('/:cid', jwtAuth, cartsController.getProductsByCartId)

cartsRouter.post('/', jwtAuth, cartsController.postCart)
cartsRouter.post('/:cid/product/:pid', jwtAuth, cartsController.postProductInCart)

cartsRouter.put('/:cid', jwtAuth, cartsController.putProductsInCart)
cartsRouter.put('/:cid/products/:pid', jwtAuth, cartsController.setQuantityOfProductsInCart)

cartsRouter.delete('/:cid/products/:pid', jwtAuth, cartsController.deleteProductFromCart)
cartsRouter.delete('/:cid', jwtAuth, cartsController.deleteAllProductsFromCart)

export default cartsRouter;