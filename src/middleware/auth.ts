import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { authPrefix } from '../constants/errors';
import { SECRET } from '../constants/secret';

export default function auth (req: Request, _: Response, next: NextFunction) {
  const { token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, SECRET) as { _id: string };
  }
  catch {
    next(new Error(`${authPrefix}Ошибка авторизации.`));
  }
  req.user = payload;
  next();
}
