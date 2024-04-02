import { Request, Response } from "express";
import { erroCamposNaoInformados, erroServidor } from "../util/response.helper";
import { AuthService } from "../services/auth.service";

export class LoginController {
    public async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return erroCamposNaoInformados(['email', 'senha'], res);
            }

            const authService = new AuthService();
            const result = await authService.login({
                email,
                senha,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
