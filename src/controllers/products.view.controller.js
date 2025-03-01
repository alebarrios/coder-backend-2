import { productService } from '../services/ProductService.js';

async function getAllProducts(req, res) {
    try {
        const productsListDTO = await productService.getAllProducts({});
        res.status(200)
        .render("home",
            { layout : 'index', style: 'index.css', js: 'index.js', role: req.user.role.toUpperCase(),
            name: req.user.first_name, cartId: req.user.cart_id,
            title: "Productos", products: productsListDTO.toJSON().docs });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const productDTO = await productService.getOneById(id);

        res.status(200)
        .render("productDetail",
            { layout : 'index', style: 'index.css', js: 'productDetail.js',
            id, product: productDTO.toJSON() });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

export default
{getAllProducts,
getProductById,
}