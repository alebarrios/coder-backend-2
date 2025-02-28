import express from "express";
import productsController from "../controllers/products.controller.js";
import { jwtAuth } from "../utils/sessionCheck.js";

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts)
productsRouter.get('/:id', productsController.getProductById)

productsRouter.post('/', productsController.postProduct)

productsRouter.put('/:id', productsController.putProduct)

productsRouter.delete('/:id', productsController.deleteProduct)
//productsRouter.get('/', jwtAuth, productsController.getAllProducts)
//productsRouter.get('/:id', jwtAuth, productsController.getProductById)

//productsRouter.post('/', jwtAuth, productsController.postProduct)

//productsRouter.put('/:id', jwtAuth, productsController.putProduct)

//productsRouter.delete('/:id', jwtAuth, productsController.deleteProduct)

export default productsRouter;