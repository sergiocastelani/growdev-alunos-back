import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export async function verificarPermissaoDeCriacao(req: Request, res: Response, next: NextFunction) 
{
    const aluno = await alunoLogado(req);

    if (aluno.tipo !== 'M' && aluno.tipo !== 'T')
        return res.status(403).json({ ok: false, message: "Apenas alunos do tipo 'M' ou 'T' podem realizar esta operação" });

    if (aluno.tipo === 'M' && aluno.id !== req.params.id)
        return res.status(403).json({ ok: false, message: "Alunos tipo 'M' só podem criar avaliações para si mesmo" });

    next();
}

export async function verificarPermissaoDeDelecao(req: Request, res: Response, next: NextFunction) 
{
    const aluno = await alunoLogado(req);

    if (aluno.tipo !== 'T')
        return res.status(403).json({ ok: false, message: "Apenas alunos do tipo 'T' podem realizar esta operação" });

    next();
}

export async function verificarPermissaoDeUpdate(req: Request, res: Response, next: NextFunction) 
{
    const aluno = await alunoLogado(req);

    if (aluno.tipo !== 'T')
        return res.status(403).json({ ok: false, message: "Apenas alunos do tipo 'T' podem realizar esta operação" });

    next();
}

export async function verificarPermissaoDeListar(req: Request, res: Response, next: NextFunction) 
{
    const aluno = await alunoLogado(req);

    if (aluno.tipo !== 'T' && aluno.id !== req.params.id)
        return res.status(403).json({ ok: false, message: "Alunos tipo 'M' ou 'F' só podem ver suas próprias avaliações" });

    next();
}

async function alunoLogado(req: Request) 
{
    const { authorization } = req.headers;
    const authService = new AuthService();
    const authResult = await authService.validateLogin(authorization ?? '');

    return authResult.data;
}