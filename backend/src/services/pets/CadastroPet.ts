import prismaClient from "../../prisma";

interface CadastroPetRequest {
    nome: string
    idade: number
    tipo: string
    raca: string
    owner_id: string
} 

class CadastroPet {
    async execute({ nome, idade, tipo, raca, owner_id }: CadastroPetRequest) {

        if(nome == ' ') {
            throw new Error("você não cadastrou nenhum amigo :( ")

        }
        const cadastro = await prismaClient.pet.create({
            data: {
                nome,
                idade,
                tipo,
                raca,
                owner_id

            },
            select: {
                id: true,
                nome: true,
                idade: true,
                tipo: true,
                raca: true
            }
        })

        return cadastro;
    }
}

export { CadastroPet }