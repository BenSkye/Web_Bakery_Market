import { NextFunction, Request, Response } from 'express';

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`[P]::signUp::`, req.body);
      return res.status(201).json({
        code: '20001',
        metadata: { userid: 1 },
      });
    } catch (error) {
      next(error);
    }
  };
}
export default new AccessController();
