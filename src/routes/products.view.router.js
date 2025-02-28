import { Router } from "express";
//import ProductManager from "../managers/ProductManager.js";
import { isAuthenticated } from "../utils/sessionCheck.js";

const productsViewRouter = Router();
//const productManager = new ProductManager();

productsViewRouter.get("/", isAuthenticated, async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200)
        .render("home", { layout : 'index', style: 'index.css', js: 'index.js', title: "Productos", products: products.docs });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

productsViewRouter.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getOneById(id);

        res.status(200)
        .render("productDetail", { layout : 'index', style: 'index.css', js: 'productDetail.js', id, product: product.toJSON() });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default productsViewRouter;