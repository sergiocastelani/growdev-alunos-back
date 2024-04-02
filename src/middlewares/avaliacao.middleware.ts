import { NextFunction, Request, Response } from "express";

export function verificarPermissaoAluno(req: Request, res: Response, next: NextFunction) {
    const aluno = req.body.aluno;

    if (!aluno || typeof aluno.tipo !== 'string') {
        return res.status(403).json({ ok: false, message: 'Acesso não autorizado: informações de aluno ausentes ou inválidas' });
    }

    if (aluno.tipo === 'F') {
        return res.status(403).json({ ok: false, message: 'Acesso não autorizado: apenas alunos do tipo "M" ou "T" podem criar avaliações' });
    }


    if (aluno.tipo === 'M') {
        const idAlunoParam = req.params.id; 
        const idAlunoCorrente = aluno.id; 
        if (idAlunoParam !== idAlunoCorrente) {
            return res.status(403).json({ ok: false, message: 'Alunos do tipo "M" só podem criar avaliações para si mesmos' });
        }
    }

    if (aluno.tipo === 'M' || aluno.tipo === 'F') {
        const idAlunoParam = req.params.id; 
        const idAlunoCorrente = aluno.id; 
        if (idAlunoParam !== idAlunoCorrente) {
            return res.status(403).json({ ok: false, message: 'Alunos do tipo "M" ou "F" só podem listar suas próprias avaliações' });
        }
    }

    next();
}
