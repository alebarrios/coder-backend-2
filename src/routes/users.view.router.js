import { Router } from "express";
import passport from "passport";
import usersViewController from "../controllers/users.view.controller.js";
import { handlePolicies } from "../middlewares/policies-checker.js";

const usersViewRouter = Router();

usersViewRouter.get("/login", handlePolicies(["PUBLIC"]), usersViewController.loginUser);

usersViewRouter.get("/register", handlePolicies(["PUBLIC"]), usersViewController.registerUser);

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

usersViewRouter.get("/logout", handlePolicies(["PUBLIC"]), usersViewController.rootRedirect);
usersViewRouter.post("/logout", handlePolicies(["PUBLIC"]), usersViewController.logout);

usersViewRouter.get("/", handlePolicies(["PUBLIC"]), usersViewController.rootRedirect);


export default usersViewRouter;