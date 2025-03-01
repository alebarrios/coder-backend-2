
export const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
          return next();
        }
        console.log("Usuario no logueado -> Redirigiendo a /login");
        res.redirect('/login');
}

export const handlePolicies = (policies, render = false) => (req, res, next) => {
    const authHeaders = req.headers.authorization;
    console.log("handle policies authHeaders:", authHeaders);

    if (policies.includes("PUBLIC")) return next();

    if (!req.isAuthenticated())
        if (render) {
            return res.status(401).render("error", {
                layout: "index",
                error: '401',
                style: "index.css",
                title: "Acceso denegado. Usuario no autenticado.",
            });
        } else {
            return res.status(401).json({
                status: "error",
                error: "Acceso denegado. Usuario no autenticado",
            });
        }

    console.log("handle policies - user:", req.user);
    console.log("handle policies - user Role:", req.user.role);

    if (!policies.includes(req.user.role.toUpperCase())) {
        if (render) {
            return res.status(403).render("error", {
                layout: "index",
                error: '403',
                style: "index.css",
                title: "Acceso prohibido. No tenes los permisos necesarios",
            });
        } else {
            return res.status(403).json({
                status: "error",
                error: "Acceso prohibido. No tenes los permisos necesarios",
            });
        }
    }

    next();
};

export const isCartFromUser = (req, res, next) => {

    const { cid } = req.params;
    if (req.user.cart_id == cid) {
        return next();
    }
    res.status(403).json({
        status: "error",
        error: "Acceso prohibido. No tenes los permisos necesarios",
    });
}