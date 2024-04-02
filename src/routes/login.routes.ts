import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { validaEmailSenhaMiddleware } from "../middlewares/aluno.middleware";

export function loginRoutes() {
    const router = Router();

    const loginController = new LoginController();

    router.post("/", [validaEmailSenhaMiddleware], loginController.login);

    return router;
}
