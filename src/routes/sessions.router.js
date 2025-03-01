import express from "express";
import sessionsController from "../controllers/sessions.controller.js";
import { jwtAuth } from "../utils/sessionCheck.js";

const sessionsRouter = express.Router();

sessionsRouter.get('/current', jwtAuth, sessionsController.getCurrent);
sessionsRouter.post("/login", sessionsController.loginSession);

export default sessionsRouter;