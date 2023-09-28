import { Request, Response } from "express";
import { ListaRacaoService } from "../../services/racao/ListaRacaoServices";


class ListaRacaoController {
    
    async handle(req: Request, res: Response){
        console.log("entrou na ração");
        
        const listaRacaoService = new ListaRacaoService()
        const racoes = await listaRacaoService.execute(req, res)

        return res.json(racoes)
    }
}

export {ListaRacaoController}