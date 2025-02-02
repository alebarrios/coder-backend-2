import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [ true, "El Nombre es obligatorio" ],
        trim: true,
        maxLength: [ 32, "El nombre debe tener como máximo 32 caracteres" ],
    },
    last_name: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        trim: true,
        maxLength: [ 32, "El apellido debe tener como máximo 32 caracteres" ],
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
    },
    age: {
        type: Number,
        required: [ true, "La edad es obligatoria" ],
        min: [ 0, "La edad no puede ser negativa" ],
    },
    password: {
        type: String,
        required: [ true, "La contraseña es obligatoria" ],
    },
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        trim: true,
        default: "user",
    },

}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

const userModel = model("users", userSchema);

export default userModel;