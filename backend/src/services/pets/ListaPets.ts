import prismaClient from "../../prisma";



class ListaPets {
    async execute(req, res) {
        const user_id = req.body.user_id
        const petList = await prismaClient.pet.findMany({
            where: {
                owner_id: user_id
            },
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