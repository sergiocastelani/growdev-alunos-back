import { NextFunction, Request, Response } from "express";

export function verificarPermissaoAlunoTipoT(req: Request, res: Response, next: NextFunction) {
    const aluno = req.body; 
    if (aluno.tipo !== 'T') {
        return res.status(403).send({ ok: false, message: 'Acesso não autorizado' });
    }
    next();
}
