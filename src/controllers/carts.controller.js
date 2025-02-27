import { cartService } from "../services/CartService.js";

async function getProductsByCartId(req,res){
    try {
        const { cid } = req.params;
        const cartDTO = await cartService.getOneById(cid);
        res.status(200).json({ status: "success", payload: cartDTO.products });

    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function postCart(req,res){
    try {
        const cartDTO = await cartService.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cartDTO.id });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function putProductsInCart(req,res){
    try {
        const { cid } = req.params;
        const cartDTO = await cartService.updateProductsInCart(cid, req.body);
        res.status(200).json({ status: "success", payload: cartDTO.products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function setQuantityOfProductsInCart(req,res){
    try {
        const { cid, pid } = req.params;
        const cartDTO = await cartService.setQuantOfProductsInCart(cid, pid, req.body);
        res.status(200).json({ status: "success", payload: cartDTO.products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function postProductInCart(req,res){
    try {
        const { cid, pid } = req.params;
        const cartDTO = await cartService.addProductToCart(cid,pid);
        res.status(200).json({ status: "success", payload: cartDTO.products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function deleteProductFromCart(req,res){
    try {
        const { cid, pid } = req.params;
        const cartDTO = await cartService.delProductFromCart(cid,pid);
        res.status(200).json({ status: "success", payload: cartDTO.products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function deleteAllProductsFromCart(req,res){
    try {
        const { cid } = req.params;
        const cartDTO = await cartService.updateProductsInCart(cid);
        res.status(200).json({ status: "success", payload: cartDTO.products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

export default
{getProductsByCartId,
postCart,
putProductsInCart,
setQuantityOfProductsInCart,
postProductInCart,
deleteProductFromCart,
deleteAllProductsFromCart}