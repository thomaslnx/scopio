import { Router, Request, Response } from 'express';

const transactionRouter = Router();

transactionRouter.get('/', (_req: Request, res: Response) => {
  res.send('Ok tudo fucionando!!');
});

export default transactionRouter;
