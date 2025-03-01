import env from "../config/env.js";
import jwt from "jsonwebtoken";

export const createToken = (user) => {
    return jwt.sign(user, env.sessionSecret, { expiresIn: '1h' });
}