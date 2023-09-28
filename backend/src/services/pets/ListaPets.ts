import prismaClient from "../../prisma";

class ListaPets {
    async execute() {
        const petList = await prismaClient.pet.findMany({
            select: {
                id: true,
                nome: true,
                idade: true,
                tipo: true,
                raca: true
            }
        })
        return petList
    }
}

export {ListaPets}