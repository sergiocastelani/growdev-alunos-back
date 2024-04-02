import { Router } from "express";
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
        alunoController.criarAluno
    );

    router.get(
        "/:id", 
        alunoController.obterAluno
    );

    router.get(
        "/", 
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
