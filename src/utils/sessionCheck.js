// Chequea si el usuario está autenticado (es decir, tiene una sesion activa)
export const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
          return next();
        }
        console.log("Usuario no logueado -> Redirigiendo a /login");
        res.redirect('/login');
}