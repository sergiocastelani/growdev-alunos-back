import { Router } from "express";
import { LoginController } from "../controllers/login.controller";

export function loginRoutes() {
    const router = Router();

    const loginController = new LoginController();

    router.post("/", loginController.login);

    return router;
}
