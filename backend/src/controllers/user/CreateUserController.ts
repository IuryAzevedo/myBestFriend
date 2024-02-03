import {Request, Response, response} from 'express'
import { CreateUserService } from  '../../services/users/CreateUserServices'

class CreateUserController  { 

   async handle(req: Request, res: Response){
     
    const { nome, email, password } = req.body
    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
        nome,
        email,
        password
    })

    return res.status(200).json(user)

   }

}

export { CreateUserController }   