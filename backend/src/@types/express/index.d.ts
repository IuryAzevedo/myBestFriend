
declare namespace Express{
    export interface Request{
        user_id: string
    }
}
declare global {
  namespace Express {
      interface Request {
          user: {
              id: string | undefined; 
          };
      }
  }
}