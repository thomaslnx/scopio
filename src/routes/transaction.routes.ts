import { Router, Response } from 'express'

const transactionRouter = Router()

transactionRouter.get('/', (_, res: Response) => {
  res.send('Ok tudo fucionando!!')
})

export default transactionRouter