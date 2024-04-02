import { Aluno, Prisma } from "@prisma/client";
import { Aluno as AlunoBackend } from "../models/aluno.model";

export function adaptAlunoPrisma(aluno: Aluno): AlunoBackend {
    const novoAluno = new AlunoBackend(
        aluno.nome,
        aluno.email,
        aluno.senha,
        aluno.tipo as "M" | "T" | "F",
        aluno.idade ?? 0 
    );
    novoAluno.id = aluno.id;

    return novoAluno;
}
