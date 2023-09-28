
//aqui eu estou adicionando mais uma variável dentro do request

declare namespace Express{
    export interface Request{
        user_id: string
    }
}
declare global {
  namespace Express {
      interface Request {
          user: {
              id: string | undefined; // ou o tipo apropriado para o ID do usuário
          };
      }
  }
}