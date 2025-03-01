import ErrorManager from "../managers/ErrorManager.js";
import CartDTO from "../dao/dto/cart.dto.js";

export default class CartsRepository {
    #cartsDao;

    constructor(dao) {
        this.#cartsDao = dao;
    }

    // Obtiene un carrito específico por su ID
    async getOneById(id) {
        try {
            const cart = await this.#cartsDao.get(id);
            return new CartDTO(cart);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un carrito con productos
    async insertOne(data) {
        try {
            const cart = await this.#cartsDao.post(data);
            return new CartDTO(cart);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un producto específico dentro de un carrito
    async addProductToCart(id, productId) {
        try {
            const cart = await this.#cartsDao.addProduct(id, productId);
            return new CartDTO(cart);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un producto específico dentro de un carrito
    async delProductFromCart(id, productId) {
        try {
            const cart = await this.#cartsDao.deleteProduct(id, productId);
            return new CartDTO(cart);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza el array completo de productos dentro de un carrito
    async updateProductsInCart(id, data = []) {
        try {
            const cart = await this.#cartsDao.updateAllProducts(id, data);
            return new CartDTO(cart);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza la cantidad de productos dentro de un carrito
    async setQuantOfProductsInCart(id, productId, data) {
        try {
            const cart = await this.#cartsDao.updateProductQuantity(id, productId, data.quantity);
            return new CartDTO(cart);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}