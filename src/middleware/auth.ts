import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SECRET } from '../constants/secret';

export default function auth (req: Request, _: Response, next: Function) {
  const token = req.cookies.token;
  let payload;
  try {
    payload = jwt.verify(token, SECRET) as { _id: string };
  }
  catch {
    throw new Error('Ошибка авторизации');
  }
  req.user = payload;
  next();
}
