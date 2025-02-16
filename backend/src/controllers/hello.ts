import { Request, Response } from 'express';

export const HelloController = (req: Request, res: Response) => {
  res.send('Hello World');
};


