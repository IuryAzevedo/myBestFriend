import { Request, Response } from "express"
import UpdateProfileService from "../../services/users/UpdateProfile"

class UpdateProfileController {
    async handle(req: Request, res: Response) {
        const { nome, email, photo } = req.body;
        const updateProfile = new UpdateProfileService();

        try {
            const update = updateProfile.execute({
                nome,
                email,
                ...(photo && { photo })
            })
            return res.status(200).json('DADOS DE USUÁRIO ALTERADOS');

        } catch (error) {
            console.log('NÃO FOI POSSIVEL ALTERAR OS DADOS DO USUÁRTIO', error);
            res.status(500).json({ error: 'NÃO FOI POSSÍVEL ALTERAR OS DADOS DO USUÁRIO' });
        }
    }
}



export default UpdateProfileController