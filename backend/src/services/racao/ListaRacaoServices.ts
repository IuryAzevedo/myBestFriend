import prismaClient from "../../prisma";



class ListaRacaoService {
    async execute(req, res){
        const user_id = req.body.user_id
        const category = await prismaClient.racao.findMany({
            where: {
                owner_id: user_id,
            },
            select:{
                id: true,
                nome: true,
                tipo: true,
                preco: true,
                quantidade: true,
                dataRacao: true
            }
        })
        console.log("log biggas",category);
        
        return category
    }
}

export { ListaRacaoService }