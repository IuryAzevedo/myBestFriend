import { Request, Response } from "express";
import { CadastroPet } from "../../services/pets/CadastroPet";

class CadastroPetsController {
    async handle(req: Request, res: Response) {
        
        const {nome, idade, tipo, raca} = req.body
        const owner_id = req.user_id; 
        
        if (!owner_id) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        
        const cadastroPet = new CadastroPet()
        
        const cadastro = await cadastroPet.execute({
            nome,
            idade, 
            tipo,
            raca,
            owner_id
        })
        return res.json(cadastro)
    }
    
}

export { CadastroPetsController }