
import prismaClient from "../../prisma";


interface AddRacaoRequest {
    nome: string
    tipo: string
    preco: number
    quantidade: number
    dataRacao: Date
    owner_id: string


}

class AddRacao {
    async execute({ nome, tipo, preco, quantidade, dataRacao, owner_id }: AddRacaoRequest) {


        try {
            const addRacao = await prismaClient.racao.create({
                data: {
                    nome,
                    tipo,
                    preco,
                    quantidade,
                    dataRacao,
                    owner_id
                },
                select: {
                    id: true,
                    nome: true,
                    tipo: true,
                    preco: true,
                    quantidade: true,
                    dataRacao: true

                }
            })
            return addRacao;

        } catch (error) {
            if (!nome) {
                throw new Error("você não castrou nenhuma ração");
            }
        }
    }
}

export { AddRacao }