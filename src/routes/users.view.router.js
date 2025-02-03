import { Router } from "express";
import passport from "passport";

const usersViewRouter = Router();

usersViewRouter.get("/login", async (req, res) => {
    try {
        if (req.isUnauthenticated()){
            res.status(200)
            .render("login", {
                layout : 'index',
                style: 'index.css',
                js: 'login.js',
                title: "Login",
                });
        } else {
            res.redirect('/products');
        }
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

usersViewRouter.get("/register", async (req, res) => {
    try {
        if (req.isUnauthenticated()){
        res.status(200)
        .render("register", {
            layout : 'index',
            style: 'index.css',
            js: 'register.js',
            title: "Register",
            });
        } else {
            res.redirect('/products');
        }
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

usersViewRouter.post("/register",
    passport.authenticate("register", { failureRedirect: "fail-register" }),
    async (req, res) => {
        console.log("Usuario registrado: ", req.session.passport.user);
        res.redirect("/login");
    }
);

usersViewRouter.get("/fail-register", (req, res) => {
    console.log("Error o Usuario ya existe. Redireccionando a /register");
    res.redirect("/register");
});

usersViewRouter.post("/login",
    passport.authenticate("login", { failureRedirect: "fail-login" }),
    async (req, res) => {
        console.log("Usuario logeado: ", req.session.passport.user);
        res.redirect("/products");
    }
);

usersViewRouter.get("/fail-login", (req, res) => {
    console.log("Redireccionando a /login");
    res.redirect("/login");
});

usersViewRouter.get("/auth/google",passport.authenticate('google',{scope:["email", "profile"]}))

usersViewRouter.get("/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/products",
      failureRedirect: "/login",
    })
  );

usersViewRouter.post("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
});

usersViewRouter.get("/", async (req, res) => {
    try {
        res.redirect('/login');
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});


export default usersViewRouter;