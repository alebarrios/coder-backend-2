import express from "express";
import productsController from "../controllers/products.controller.js";
import { handlePolicies } from "../middlewares/policies-checker.js";
import { jwtAuth } from "../middlewares/passportJwtAuth.js";

const productsRouter = express.Router();

productsRouter.get('/', jwtAuth, handlePolicies(["USER","ADMIN"]), productsController.getAllProducts)
productsRouter.get('/:id', jwtAuth, handlePolicies(["USER","ADMIN"]), productsController.getProductById)

productsRouter.post('/', jwtAuth, handlePolicies(["ADMIN"]), productsController.postProduct)

productsRouter.put('/:id', jwtAuth, handlePolicies(["ADMIN"]), productsController.putProduct)

productsRouter.delete('/:id', jwtAuth, handlePolicies(["ADMIN"]), productsController.deleteProduct)

export default productsRouter;