import { Request, Response } from "express";
import { AddRacao } from "../../services/racao/AddRacao";

class AddRacaoController {
    async handle(req: Request, res: Response) {
        
        const {nome, tipo, preco, quantidade, dataRacao,  } = req.body
        const owner_id = req.user_id
        
        if (!owner_id) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        
        const cadastroRacao = new AddRacao()
        
        const cadastro = await cadastroRacao.execute({
        
            nome,
            tipo,
            preco,
            quantidade, 
            dataRacao,
            owner_id
           
          
        })
        return res.json(cadastro)
    }
    
}

export { AddRacaoController }


