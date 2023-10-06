import { Request, Response } from "express";
import { ListaRacaoService } from "../../services/racao/ListaRacaoServices";
import { ListaPets } from "../../services/pets/ListaPets";


class ListaPetsController {
    
    async handle(req: Request, res: Response){
        console.log("entrou na ração");
        
        const listaPetsService = new ListaPets()
        const racoes = await listaPetsService.execute(req, res)

        return res.json(racoes)
    }
}

export {ListaPetsController}