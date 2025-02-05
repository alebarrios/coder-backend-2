import express from "express";
import UserManager from "../managers/UserManager.js";
import { createToken, jwtAuth } from "../utils/sessionCheck.js";
import { isValidPassword } from "../utils/cryptUtils.js";

const userRouter = express.Router();
const userManager = new UserManager();

export default (app) => { app.use('/api/sessions', userRouter)}

userRouter.get('/current', jwtAuth, (req,res)=>{
    console.log("Req.user: ", req.user);
    const user = { ...req.user._doc };
    delete user.password;
    res.status(200).json({ status: "success", payload: user });
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmail(email);

        if (!userFound || !isValidPassword(password, userFound.password))
            return res.status(401).json({ status: "error", message: "Credenciales invalidas" });

        const user = { ...userFound };
        delete user.password;

        let token = createToken(user);

        res.cookie("authCookie", token, { maxAge: 60 * 2, httpOnly: true }) // TODO poner en true
        .json({ status: "success", message: "Login exitoso" });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

