import { Router } from "express";
import { AvaliacaoController } from "../controllers/avaliacao.controller";
import { validaLoginMiddleware } from "../middlewares/login.middleware";
import { verificarPermissaoDeCriacao, verificarPermissaoDeDelecao, verificarPermissaoDeListar, verificarPermissaoDeUpdate } from "../middlewares/avaliacao.middleware";

export function avaliacaoRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const avaliacaoController = new AvaliacaoController();

    router.post(
        "/", 
        [validaLoginMiddleware, verificarPermissaoDeCriacao], 
        avaliacaoController.criarAvaliacao
    );

    router.put(
        "/:idAvaliacao", 
        [validaLoginMiddleware, verificarPermissaoDeUpdate], 
        avaliacaoController.atualizarAvaliacao
    );
    
    router.delete(
        "/:idAvaliacao", 
        [validaLoginMiddleware, verificarPermissaoDeDelecao], 
        avaliacaoController.excluirAvaliacao
    );

    router.get(
        "/", 
        [validaLoginMiddleware, verificarPermissaoDeListar], 
        avaliacaoController.listarAvaliacoes
    );

    return router;
}
