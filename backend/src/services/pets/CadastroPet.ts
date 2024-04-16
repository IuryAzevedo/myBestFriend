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
        try {
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
                    raca: true,
                    owner_id: true
                }
            })
            return cadastro;
        } catch (error) {
            if (!nome) {
                throw new Error("você não cadastrou nenhum amigo :( ")
            }
        }
    }
}

export { CadastroPet }