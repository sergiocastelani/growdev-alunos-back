import { NextFunction, Request, Response } from "express";
import { erroCamposNaoInformados } from "../util/response.helper";

export function validaEmailSenhaMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha)
            return erroCamposNaoInformados(['email', 'senha'], res);

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
