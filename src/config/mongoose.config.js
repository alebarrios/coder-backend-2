import env from "./env.js";
import { connect, Types } from "mongoose";

export const connectDB = async () => {
    const URI =
    `mongodb+srv://${env.mongoUsername}:${env.mongoPassword}@${env.mongoClusterUrl}/${env.mongoDbName}`;

    try {
        await connect(URI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectar con MongoDB", error.message);
    }
};

// Verifica que un ID sea válido con el formato de ObjectId de MongoDB
export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};