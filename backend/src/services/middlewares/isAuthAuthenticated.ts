import {Request, Response, NextFunction, response} from 'express'
import { verify } from 'jsonwebtoken'


interface PayLoad{
    sub: string
}

export function isAuthAtheticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // receber o token
    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(400).end()
    }

    //passei a virgula aqui no array para poder ignorar o primeiro item do array, e vir somente o token
    const [, token] = authToken.split(" ")

    try {
        //validando o token 
        const {sub} = verify(
            token, 
                process.env.JWT_SECRET
        ) as PayLoad

        req.user_id = sub

        return next()
    }
    
    catch(err){
        return res.status(401).end()
    }

}