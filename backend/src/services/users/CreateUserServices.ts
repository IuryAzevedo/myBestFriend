import prismaClient from '../../prisma';
import { hash } from 'bcryptjs'

interface UserRequest {
    nome: string
    email: string
    password: string
    photo?: string 
}

class CreateUserService {
    async execute({ nome, email, password, photo }: UserRequest) {
        // Verificar se o email está correto
        if (!email) {
            throw new Error("Email incorreto, tente novamente");
        }

        // Verificar se o email já está cadastrado 
        const usuarioExistente = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (usuarioExistente) {
            throw new Error("Esse email já existe");
        }

        const passwordHash = await hash(password, 8);

        const userData = {
            nome,
            email,
            password: passwordHash,
            // Adicionar campo photo apenas se estiver presente
            ...(photo && { photo })
        };

        const user = await prismaClient.user.create({
            data: userData
        });
        
        return user;
    }
}

export { CreateUserService };
