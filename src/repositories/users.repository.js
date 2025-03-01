import ErrorManager from "../managers/ErrorManager.js";
import { isValidPassword } from "../utils/cryptUtils.js";
import UserDTO from "../dao/dto/user.dto.js";

export default class UsersRepository {
    #usersDao;

    constructor(dao) {
        this.#usersDao = dao;
    }

    // Busca un usuario por su ID
    async findOneById(id) {
        try {
            const userFound = await this.#usersDao.get(id);
            return new UserDTO(userFound);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Busca un usuario por su ID
    async findOneByEmail(email) {
        try {
            const userFound = await this.#usersDao.getByEmail(email);
            if (!userFound) {
                return undefined;
            }
            return new UserDTO(userFound);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un usuario específico por su Email
    async validateEmailAndPass(email, password, throwErr = true) {
        try {
            const userFound = await this.#usersDao.getByEmail(email);

            if (userFound && isValidPassword(password, userFound.password))
                return new UserDTO(userFound);
            else if (throwErr)
                throw new ErrorManager("Credenciales inválidas", 401);
            else
                return undefined;

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Crea un nuevo usuario
    async insertOne(data) {
        try {
            const user = await this.#usersDao.post(data);
            return new UserDTO(user);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}