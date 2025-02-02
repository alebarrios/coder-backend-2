import { Router } from "express";

const usersViewRouter = Router();

usersViewRouter.get("/login", async (req, res) => {
    try {
        res.status(200)
        .render("home", {
            layout : 'index',
            style: 'index.css',
            js: 'login.js',
            title: "Login",
            });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

usersViewRouter.get("/register", async (req, res) => {
    try {
        res.redirect('/login');
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

usersViewRouter.get("/", async (req, res) => {
    try {
        res.redirect('/login');
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});


export default usersViewRouter;