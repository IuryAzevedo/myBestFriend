import { Request, Response } from 'express';
import { CreateUserService } from '../../services/users/CreateUserServices';

class CreateUserController {

    async handle(req: Request, res: Response) {
        const { nome, email, password, photo } = req.body;
        const createUserService = new CreateUserService();

        try {
            const userData = {
                nome,
                email,
                password,
                ...(photo && { photo }) 
            };

            const user = await createUserService.execute(userData);

            return res.status(200).json(user);
        } catch (error) {
            console.log('Erro ao criar usuário', error);
            return res.status(400).json({ error: "Erro ao criar usuário." });
        }
    }
}

export { CreateUserController };
