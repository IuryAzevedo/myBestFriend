import { Response, Request } from "express";
import { DeleteRacaoService } from "../../services/racao/DeleteRacaoService";


class DeleteRacaoController {
    async handle(req: Request, res: Response) {

        const deleteRacaoService = new DeleteRacaoService() 
        try {
            
            await deleteRacaoService.execute(req, res);
           
          } catch (error) {
            console.error("Erro ao lidar com a exclusão da ração:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
       }
   }
}

export {DeleteRacaoController}