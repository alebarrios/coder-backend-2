import { Router } from "express";
import passport from "passport";
import usersViewController from "../controllers/users.view.controller.js";

const usersViewRouter = Router();

usersViewRouter.get("/login", usersViewController.loginUser);

usersViewRouter.get("/register", usersViewController.registerUser);

usersViewRouter.post("/register",
    passport.authenticate("register", { failureRedirect: "fail-register" }),
    usersViewController.passportRegistered);

usersViewRouter.get("/fail-register", usersViewController.failRegister);

usersViewRouter.post("/login",
    passport.authenticate("login", { failureRedirect: "fail-login" }),
    usersViewController.passportLogged);

usersViewRouter.get("/fail-login", usersViewController.failLogin);

usersViewRouter.get("/auth/google",passport.authenticate('google',{scope:["email", "profile"]}))

usersViewRouter.get("/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/products",
      failureRedirect: "/login",
    })
  );

usersViewRouter.post("/logout", usersViewController.logout);

usersViewRouter.get("/", usersViewController.rootRedirect);


export default usersViewRouter;