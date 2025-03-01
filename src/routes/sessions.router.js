import express from "express";
import sessionsController from "../controllers/sessions.controller.js";
import { jwtAuth } from "../middlewares/passportJwtAuth.js";
import { handlePolicies } from "../middlewares/policies-checker.js";

const sessionsRouter = express.Router();

sessionsRouter.get('/current', jwtAuth, handlePolicies(["USER","ADMIN"]), sessionsController.getCurrent);

sessionsRouter.post("/login", handlePolicies(["PUBLIC"]), sessionsController.loginSession);

export default sessionsRouter;