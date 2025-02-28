import express from "express";
import cartsController from "../controllers/carts.controller.js";
import { jwtAuth } from "../utils/sessionCheck.js";

const cartsRouter = express.Router();

//cartsRouter.get('/:cid', jwtAuth, cartsController.getProductsByCartId)
cartsRouter.get('/:cid', cartsController.getProductsByCartId)

//cartsRouter.post('/', jwtAuth, cartsController.postCart)
cartsRouter.post('/', cartsController.postCart)
//cartsRouter.post('/:cid/product/:pid', jwtAuth, cartsController.postProductInCart)
cartsRouter.post('/:cid/product/:pid', cartsController.postProductInCart)

//cartsRouter.put('/:cid', jwtAuth, cartsController.putProductsInCart)
cartsRouter.put('/:cid', cartsController.putProductsInCart)
//cartsRouter.put('/:cid/products/:pid', jwtAuth, cartsController.setQuantityOfProductsInCart)
cartsRouter.put('/:cid/products/:pid', cartsController.setQuantityOfProductsInCart)

//cartsRouter.delete('/:cid/products/:pid', jwtAuth, cartsController.deleteProductFromCart)
cartsRouter.delete('/:cid/products/:pid', cartsController.deleteProductFromCart)
//cartsRouter.delete('/:cid', jwtAuth, cartsController.deleteAllProductsFromCart)
cartsRouter.delete('/:cid', cartsController.deleteAllProductsFromCart)

export default cartsRouter;