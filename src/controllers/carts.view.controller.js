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
                console.log("purchase: ", item.product);
                const pr1 = await productService.updateOneById(
                    item.product._id.toString(), { stock: item.product.stock - item.quantity });
                console.log("pr1: ", pr1);

                const pr2 = await cartService.delProductFromCart(cid,item.product._id.toString());
                console.log("pr2: ", pr2);
                console.log("item.product.price: ", item.product.price);

                total += item.product.price * item.quantity;
                console.log("total: ", total);
            } else {
                productsWithoutStock.push(item.product._id.toString());
            }
        }
        console.log(productsWithoutStock);

        const newTicket = {
            purchaser: req.user.email,
            amount: +total,
        }
        let ticketDTO = null;
        if(total > 0){
            console.log("voy a insertar ticket: ", newTicket);
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