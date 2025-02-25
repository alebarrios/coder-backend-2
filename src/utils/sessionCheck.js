import env from "../config/env.js";
import jwt from "jsonwebtoken";
import passport from "passport";

// Chequea si el usuario está autenticado (es decir, tiene una sesion activa)
export const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
          return next();
        }
        console.log("Usuario no logueado -> Redirigiendo a /login");
        res.redirect('/login');
}

export const createToken = (user) => {
  return jwt.sign(user, env.sessionSecret, { expiresIn: '1h' });
}

// Middleware personalizado para manejar respuestas "Unauthorized"
export const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401)
            .json({ status: "error", message: 'No autorizado: no se encontró ningún token de autenticación.' });
        }
        req.user = user;
        next();
    })(req, res, next);
};