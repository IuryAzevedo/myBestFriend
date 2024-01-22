import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'

import { router } from './routes'
const app = express();
app.use(express.json())
app.use(cors())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            erro: err.message
        })
    }
    return res.status(500).json({
        satatus: 'error',
        message: 'internal server error'
    })
})

app.use("/", (req, res) => {
    return res.status(200).json("API OK")
})




app.listen(3333, () => console.log('servidor online!'))