import CartModel from "./models/cart.model.js";
import ErrorManager from "../../managers/ErrorManager.js";
import { isValidID } from "../../config/mongoose.config.js";

export default class CartsDAO{

    getAll = async ()=>{
        return await CartModel.find()
    }

    get = async (id)=>{
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        return await CartModel.findById(id).populate("products.product");
    }

    post = async (cart)=>{
        return await CartModel.create(cart)
    }

    addProduct = async (id, productId)=>{

        const cartFound = await this.get(id);

        if (!cartFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        const productIndex =
            cartFound.products.findIndex((item) => item.product._id.toString() === productId);

        if (productIndex >= 0) {
            cartFound.products[productIndex].quantity++;
        } else {
            cartFound.products.push({ product: productId, quantity: 1 });
        }

        await cartFound.save();
        return cartFound;
    }

    deleteProduct = async (id, productId)=>{
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        return await CartModel.findByIdAndUpdate(
            id,
            { $pull: { products: { product: { $eq: productId } } } })
    }

    updateAllProducts = async (id, data)=>{
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        return await CartModel.findByIdAndUpdate(
            id,
            { $set: { products: data } } )
    }

    updateProductQuantity = async (id, productId, quantity)=>{
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        if (isNaN(parseInt(quantity))) {
            throw new ErrorManager("campo quantity no es numérico", 400);
        }

        if (quantity < 0) {
            throw new ErrorManager("campo quantity no puede ser negativo", 400);
        }

        return await CartModel.findByIdAndUpdate(
            id,
            { $set: { 'products.$[elem].quantity': quantity } },
            { arrayFilters: [{ 'elem.product': productId }], new: false} )
    }
}