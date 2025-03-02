import { cartService } from '../services/CartService.js';
import { ticketService } from '../services/TicketService.js';
import { productService } from '../services/ProductService.js';

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

async function addProductToCart(req,res){
    try {
        const { cid, pid } = req.params;
        await cartService.addProductToCart(cid,pid);
        res.status(200).redirect(`/products`);
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function purchaseCart(req, res) {
    try {
        const { cid } = req.params;
        const cartDTO = await cartService.getOneById(cid);

        let total = 0;
        const productsWithoutStock = [];
        for(let item of cartDTO.toJSON().products){
            if (item.quantity <= item.product.stock) {
                await productService.updateOneById(
                    item.product._id.toString(), { stock: item.product.stock - item.quantity });

                await cartService.delProductFromCart(cid,item.product._id.toString());
                total += item.product.price * item.quantity;
            } else {
                productsWithoutStock.push(item.product._id.toString());
            }
        }

        const newTicket = {
            purchaser: req.user.email,
            amount: +total,
        }
        let ticketDTO = null;
        if(total > 0){
            ticketDTO = await ticketService.insertOne(newTicket);
        }
        res.status(200)
        .render("purchaseDetail",{
            layout : 'index',
            style: 'index.css',
            total,
            code: ticketDTO?.toJSON().code || "",
            email: req.user.email,
            cartId: cid,
            productsWithoutStock,
        });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

async function removeAllProductsFromCart(req,res){
    try {
        const { cid } = req.params;
        await cartService.updateProductsInCart(cid);
        res.status(200).redirect(`/products`);
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

export default
{getCartById,
addProductToCart,
purchaseCart,
removeAllProductsFromCart,
}