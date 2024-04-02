import { Request, Response } from "express";
import { erroCamposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import { AvaliacaoService } from "../services/avaliacao.service";

const avaliacaoService = new AvaliacaoService();

export class AvaliacaoController {

    public async criarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { disciplina, nota } = req.body;

            if (!disciplina || !nota) {
                return erroCamposNaoInformados(['disciplina', 'nota'], res);
            }

            const avaliacao = await avaliacaoService.criarAvaliacao(id, disciplina, nota);

            return res.status(201).send({
                ok: true,
                message: "Avaliação criada com sucesso",
                data: avaliacao,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async listarAvaliacoes(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const avaliacoes = await avaliacaoService.listarAvaliacoes(id);

            return res.status(200).send({
                ok: true,
                message: "Avaliações listadas com sucesso",
                data: avaliacoes,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async atualizarAvaliacao(req: Request, res: Response) {
        try {
            const { idAvaliacao } = req.params;
            const { nota, disciplina } = req.body;

            if (!nota) {
                return erroCamposNaoInformados(['nota'], res);
            }

            const avaliacao = await avaliacaoService.atualizarAvaliacao(idAvaliacao, nota, disciplina);

            return res.status(200).send({
                ok: true,
                message: "Avaliação atualizada com sucesso",
                data: avaliacao,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

     public async excluirAvaliacao(req: Request, res: Response) {
        try {
            const { idAvaliacao } = req.params;

            await avaliacaoService.excluirAvaliacao(idAvaliacao);

            return res.status(200).send({
                ok: true,
                message: "Avaliação excluída com sucesso",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

}
