import {Request, Response} from 'express'
import {LoginUser} from '../../services/users/LoginUser'

class LoginUserController {
    async handle(req: Request, res: Response) {
        const {email, password} = req.body

        const loginUser = new LoginUser()

        const login = await loginUser.execute({
            email,
            password
        })
        return res.status(200).json(login)
    }
}

export { LoginUserController }