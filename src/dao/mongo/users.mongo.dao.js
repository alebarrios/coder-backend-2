import UserModel from "./models/user.model.js";
import ErrorManager from "../../managers/ErrorManager.js";
import { isValidID } from "../../config/mongoose.config.js";

export default class UsersDAO{

    get = async (id)=>{
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }
        const userFound = await UserModel.findById(id);

        if (!userFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return userFound;
    }

    getByEmail = async (email)=>{

        return await UserModel.findOne({ email })
    }

    post = async (data)=>{

        return await UserModel.create(data);
    }
}