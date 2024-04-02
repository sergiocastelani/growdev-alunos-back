import repository from "../database/prisma.repository";
import { Aluno } from "../models/aluno.model";
import { Avaliacao } from "../models/avaliacao.model";
import { adaptAlunoPrisma } from "../util/aluno.adapter";


interface AvaliacaoPrismaData {
    id: string;
    disciplina: string;
    nota: number;
    idAluno: string;
    
}

export class AvaliacaoService {
    public async criarAvaliacao(idAluno: string, disciplina: string, nota: number): Promise<Avaliacao> {
        try {
            if (!disciplina || !nota) {
                throw new Error("Disciplina e nota são campos obrigatórios.");
            }

            const aluno = await repository.aluno.findUnique({ where: { id: idAluno } });
            if (!aluno) {
                throw new Error("Aluno não encontrado.");
            }

            const alunoBackend = adaptAlunoPrisma(aluno);

            const avaliacao = new Avaliacao(disciplina, nota, alunoBackend);

            const result = await repository.avaliacao.create({
                data: {
                    disciplina: avaliacao.disciplina,
                    nota: avaliacao.nota,
                    idAluno: aluno.id,
                },
            });

            
            const notaNumber: number = Number(nota);
            
            const novaAvaliacao: Avaliacao = {
                id: result.id,
                disciplina: result.disciplina,
                nota: notaNumber,
                aluno: adaptAlunoPrisma(aluno),
            };

            return novaAvaliacao;
        } catch (error: any) {
            throw new Error(`Erro ao criar avaliação: ${error.message}`);
        }
    }

    // Listar as avaliações de um aluno específico
    public async listarAvaliacoes(idAluno: string): Promise<Avaliacao[]> {
        try {
            const aluno = await repository.aluno.findUnique({
                where: { id: idAluno },
                include: { avaliacoes: true },
            });

            if (!aluno) {
                throw new Error("Aluno não encontrado.");
            }

            const avaliacoes: Avaliacao[] = aluno.avaliacoes.map((avaliacaoPrisma: any) => {
                return {
                    id: avaliacaoPrisma.id,
                    disciplina: avaliacaoPrisma.disciplina,
                    nota: avaliacaoPrisma.nota,
                    aluno: adaptAlunoPrisma(aluno),
                };
            });

            return avaliacoes;
        } catch (error: any) {
            throw new Error(`Erro ao listar avaliações: ${error.message}`);
        }
    }

    // Atualizar uma avaliação

    public async atualizarAvaliacao(idAvaliacao: string, nota: number, disciplina?: string): Promise<Avaliacao> {
        try {
            const avaliacaoExistente = await repository.avaliacao.findUnique({
                where: { id: idAvaliacao },
            });
    
            if (!avaliacaoExistente) {
                throw new Error("Avaliação não encontrada.");
            }
    
            const updatedAvaliacao = await repository.avaliacao.update({
                where: { id: idAvaliacao },
                data: {
                    nota,
                    disciplina,
                },
            });
    
            const notaNumber: number = Number(nota);
    
            // Obtém o aluno correspondente
            const aluno = await repository.aluno.findUnique({
                where: { id: updatedAvaliacao.idAluno },
            });
    
            if (!aluno) {
                throw new Error("Aluno não encontrado.");
            }
    
            const alunoAdaptado = adaptAlunoPrisma(aluno);
    
            const avaliacao: Avaliacao = {
                id: updatedAvaliacao.id,
                disciplina: updatedAvaliacao.disciplina,
                nota: notaNumber,
                aluno: alunoAdaptado,
            };
    
            return avaliacao;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar avaliação: ${error.message}`);
        }
    }

    // Excluir uma avaliação
    public async excluirAvaliacao(idAvaliacao: string): Promise<void> {
        try {
            const avaliacaoExistente = await repository.avaliacao.findUnique({
                where: { id: idAvaliacao },
            });

            if (!avaliacaoExistente) {
                throw new Error("Avaliação não encontrada.");
            }

            await repository.avaliacao.delete({
                where: { id: idAvaliacao },
            });
        } catch (error: any) {
            throw new Error(`Erro ao excluir avaliação: ${error.message}`);
        }
    }

}

