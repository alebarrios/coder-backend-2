import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import UserModel from "../models/user.model.js";

export default class UserManager {
    #userModel;

    constructor() {
        this.#userModel = UserModel;
    }

    // Busca un usuario por su ID
    async #findOneById(id) {

        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const userFound = await this.#userModel.findById(id);

        if (!userFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return userFound;
    }

    // Obtiene un usuario específico por su ID
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
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