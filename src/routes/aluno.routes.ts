import { Router } from "express";
import { logMiddleware } from "../middlewares/log.middleware";
import { validaLoginMiddleware } from "../middlewares/login.middleware";
import { AlunoController } from "../controllers/aluno.controller";
import { avaliacaoRoutes } from "./avaliacao.routes";

export function alunoRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const alunoController = new AlunoController();

    router.post(
        "/", 
        [logMiddleware], 
        alunoController.criarAluno
    );

    router.get(
        "/:id", 
        [logMiddleware], 
        alunoController.obterAluno
    );

    router.get(
        "/", 
        [logMiddleware], 
        alunoController.listarAlunos
    );

    router.delete(
        "/:id", 
        [validaLoginMiddleware], 
        alunoController.deletarAluno
    );

    router.put(
        "/:id", 
        [validaLoginMiddleware], 
        alunoController.atualizarAluno
    );

    router.use("/:id/avaliacao", avaliacaoRoutes());

    return router;
}
