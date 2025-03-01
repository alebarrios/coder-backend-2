import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    purchaser: {
        type: String,
        required: [ true, "El correo del comprador es obligatorio" ],
    },
    amount: {
        type: Number,
        required: [ true, "El monto es obligatorio" ],
        min: [ 0.1, "El monto debe ser un valor positivo" ],
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

const ticketModel = model("tickets", ticketSchema);

export default ticketModel;