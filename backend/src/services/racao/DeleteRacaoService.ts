import prismaClient from "../../prisma";

class DeleteRacaoService {
  async execute(req, res) {
    const userId = req.user_id; 
    const racaoId = req.params.itemId;

    try {
      const racao = await prismaClient.racao.findUnique({
        where: {
          id: racaoId,
        },
      });

      if (!racao) {
        return res.status(404).json({ error: "Ração não encontrada." });
      }

     
      if (racao.owner_id !== userId) {
        return res.status(403).json({ error: "Você não tem permissão para excluir esta ração." });
      }

      await prismaClient.racao.delete({
        where: {
          id: racaoId,
        },
      });

      return res.status(200).json({ message: "Ração excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir a ração:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export { DeleteRacaoService };
