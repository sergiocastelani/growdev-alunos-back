import { Aluno } from "../models/aluno.model";
import repository from "../database/prisma.repository";

export class AlunoService {

    public async criarAluno(nome: string, email: string, senha: string, tipo: string, idade?: number): Promise<Aluno> {
        if (tipo !== 'M' && tipo !== 'T' && tipo !== 'F') {
            throw new Error("Tipo de aluno inválido. O tipo deve ser 'M', 'T' ou 'F'.");
        }

        const aluno = new Aluno(nome, email, senha, tipo, idade);
        const novoAluno = await repository.aluno.create({ data: aluno });
        return novoAluno as Aluno;
    }

    public async obterAlunoPorId(id: string): Promise<Aluno | null> {
        const aluno = await repository.aluno.findUnique({ where: { id } });
        return aluno as Aluno || null;
    }

    public async atualizarAluno(id: string, nome?: string, idade?: number): Promise<Aluno> {
        const alunoExistente = await repository.aluno.findUnique({ where: { id } });

        if (!alunoExistente) {
            throw new Error("Aluno não encontrado");
        }

        const dadosAtualizados: any = {};
        if (nome) dadosAtualizados.nome = nome;
        if (idade) dadosAtualizados.idade = idade;

        const alunoAtualizado = await repository.aluno.update({ where: { id }, data: dadosAtualizados });
        return alunoAtualizado as Aluno;
    }

    public async deletarAluno(id: string): Promise<void> {
        const alunoExistente = await repository.aluno.findUnique({ where: { id } });

        if (!alunoExistente) {
            throw new Error("Aluno não encontrado");
        }

        await repository.aluno.delete({ where: { id } });
    }

    public async listarAlunos(): Promise<Aluno[]> {
        const alunos = await repository.aluno.findMany();
        return alunos as Aluno[];
    }
}
