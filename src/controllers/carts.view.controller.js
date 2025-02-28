import { cartService } from '../services/CartService.js';

async function getCartById(req, res) {
    try {
        const { cid } = req.params;
        const cartDTO = await cartService.getOneById(cid);

        res.status(200)
        .render("cartDetail",
            { layout : 'index', style: 'index.css',
            js: 'cartDetail.js', id : cid, products: cartDTO.toJSON().products });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

export default
{getCartById,
}