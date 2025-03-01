import passport from "passport";

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