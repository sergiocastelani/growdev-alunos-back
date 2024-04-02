import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

const alunoService = new AlunoService();

export class AlunoController {

    public async criarAluno(req: Request, res: Response) {
        try {
            const { nome, email, senha, idade, tipo } = req.body;

            if (!nome || !email || !senha || !tipo) {
                return res.status(400).send({
                    ok: false,
                    message: "Nome, email, senha e tipo são campos obrigatórios",
                });
            }

            const aluno = await alunoService.criarAluno(nome, email, senha, tipo, idade);

            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso",
                data: aluno,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async obterAluno(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const aluno = await alunoService.obterAlunoPorId(id);

            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno não encontrado",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Aluno obtido com sucesso",
                data: aluno,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async atualizarAluno(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, idade } = req.body;

            if (!nome && !idade) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe ao menos um campo para atualizar",
                });
            }

            const aluno = await alunoService.atualizarAluno(id, nome, idade);

            return res.status(200).send({
                ok: true,
                message: "Aluno atualizado com sucesso",
                data: aluno,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async deletarAluno(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await alunoService.deletarAluno(id);

            return res.status(200).send({
                ok: true,
                message: "Aluno deletado com sucesso",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async listarAlunos(req: Request, res: Response) {
        try {
            const alunos = await alunoService.listarAlunos();

            return res.status(200).send({
                ok: true,
                message: "Alunos listados com sucesso",
                data: alunos,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
