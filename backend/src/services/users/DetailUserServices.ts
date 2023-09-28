import prismaClient from '../../prisma'

class DetailUserServices {
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        })

        return user 
    }
}

export { DetailUserServices }