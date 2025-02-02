import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import UserModel from "../models/user.model.js";

export default class UserManager {
    #userModel;

    constructor() {
        this.#userModel = UserModel;
    }

    // Busca un producto por su ID
    async findOneById(id) {

        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }
        const productFound = await this.#userModel.findById(id);

        if (!productFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return productFound;
    }

    // Obtiene un usuario específico por su Email
    async getOneByEmail(email) {
        try {
            console.log("getOneByEmail: ", email);
            return await this.#userModel.findOne({ email });
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un usuario
    async insertOne(data) {
        try {
            const user = await this.#userModel.create(data);
            return user;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}