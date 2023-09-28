import prismaClient from '../../prisma';
import { hash } from 'bcryptjs'

interface UserRequest {
    nome: string
    email: string
    password: string
}

class CreateUserService {
    async execute({nome, email, password}: UserRequest){
   
    //verificar se o email está correto
    if(!email){
        throw new Error("email incorreto, tente novamente");
        
    }
    //verificar se o email já está cadastrado 
    const usuarioExistente = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    })

    if(usuarioExistente) {
        throw new Error("Esse email já existe")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
        data: {
            nome: nome,
            email: email,
            password: passwordHash
        },
        
        // aqui no select estou omitindo a senha do usuário
        select: {
            id: true,
            email: true,
            nome: true
        }
    })
    return user
   }

 }


export { CreateUserService }