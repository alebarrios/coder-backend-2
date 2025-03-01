import { userService } from '../services/UserService.js';
import { createToken } from "../utils/sessionCheck.js";


async function getCurrent(req, res) {
    console.log("Req.user: ", req.user);
    const user = { ...req.user._doc };
    delete user.password;
    res.status(200).json({ status: "success", payload: user });
}

async function loginSession(req, res) {
    try {
        const { email, password } = req.body;
        const userFound = await userService.validateEmailAndPass(email, password);

        let token = createToken(userFound);

        res.cookie("authCookie", token, { maxAge: 60 * 2, httpOnly: true })
        .json({ status: "success", message: "Login exitoso" });

    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
};

export default
{getCurrent,
loginSession,
}