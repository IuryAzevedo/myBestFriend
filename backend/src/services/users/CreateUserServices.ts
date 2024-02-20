import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import { Express } from 'express';
import multer from '../../config/multer';
interface UserRequest {
    nome: string
    email: string
    password: string
    photo?: Express.Multer.File;
}
class CreateUserService {
    async execute({ nome, email, password, photo }: UserRequest) {

        if (!email) {
            throw new Error("Email incorreto, tente novamente");
        }

        const usuarioExistente = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (usuarioExistente) {
            throw new Error("Esse email já existe");
        }

        const passwordHash = await hash(password, 8);

        let photoPath: string | undefined = undefined;
        if (photo) {
            photoPath = photo.path;
        }

        const userData = {
            nome,
            email,
            password: passwordHash,
            photo: photoPath,
        };

        const user = await prismaClient.user.create({
            data: userData
        });

        return user;
    }
}

export { CreateUserService };
