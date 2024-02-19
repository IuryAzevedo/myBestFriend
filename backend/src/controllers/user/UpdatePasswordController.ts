import UpdatePasswordService from "../../services/users/UpdatePasswordService";
import { Request, Response } from "express";

class UpdatePasswordController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const updatePass = new UpdatePasswordService();

            const update = await updatePass.execute({
                email,
                password
            })
            return res.status(200).json(update)
        }
        catch (error) {
            console.log('ERRO AO ALTERAR A SENHA', error);
            return res.status(500).json({ error: 'ERRO AO ALTERAR A SENHA' });
        }
    }
}

export default UpdatePasswordController;