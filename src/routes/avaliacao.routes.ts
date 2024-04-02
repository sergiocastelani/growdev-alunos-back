import { Router } from "express";
import { AvaliacaoController } from "../controllers/avaliacao.controller";
import { validaLoginMaiorIdadeMiddleware, validaLoginMiddleware } from "../middlewares/login.middleware";
import { verificarPermissaoAluno } from "../middlewares/avaliacao.middleware";
import { verificarPermissaoAlunoTipoT } from "../middlewares/techHelper.middleware";

export function avaliacaoRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const avaliacaoController = new AvaliacaoController();

    router.post(
        "/", 
        [validaLoginMiddleware, verificarPermissaoAluno], 
        avaliacaoController.criarAvaliacao
    );

    router.put(
        "/:idAvaliacao", 
        [validaLoginMiddleware, verificarPermissaoAlunoTipoT], 
        avaliacaoController.atualizarAvaliacao
    );
    
    router.delete(
        "/:idAvaliacao", 
        [validaLoginMiddleware, verificarPermissaoAlunoTipoT], 
        avaliacaoController.excluirAvaliacao
    );

    router.get(
        "/", 
        [validaLoginMiddleware, validaLoginMaiorIdadeMiddleware, verificarPermissaoAluno], 
        avaliacaoController.listarAvaliacoes
    );

    return router;
}
