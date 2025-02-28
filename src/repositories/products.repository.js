import ErrorManager from "../managers/ErrorManager.js";
import ProductDTO from "../dao/dto/product.dto.js";
import ProductListDTO from "../dao/dto/productList.dto.js";

export default class ProductsRepository {
    #productsDao;

    constructor(dao) {
        this.#productsDao = dao;
    }

    // Obtiene un producto específico por su ID
    async getOneById(id) {
        try {
            const product = await this.#productsDao.get(id);
            return new ProductDTO(product);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene una lista de productos
    async getAllProducts(params) {
        try {
            const products = await this.#productsDao.getAll(params);
            return new ProductListDTO(products);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Crea un nuevo producto
    async insertOne(data) {
        try {
            const product = await this.#productsDao.post(data);
            return new ProductDTO(product);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un producto en específico
    async updateOneById(id, data) {
        try {
            const product = await this.#productsDao.put(id, data);
            return new ProductDTO(product);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un producto en específico
    async deleteOneById (id) {
        try {
            const product = await this.#productsDao.delete(id);
            return new ProductDTO(product);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}