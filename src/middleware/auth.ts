import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import AuthError from '../utils/auth-error';
import SECRET from '../constants/secret';

export default function auth (req: Request, _: Response, next: NextFunction) {
  const { token } = req.cookies;
  let payload;
  try {
    if (!token) throw new AuthError('Ошибка авторизации.');
    payload = jwt.verify(token, SECRET) as { _id: string };
  } catch {
    next(new AuthError('Ошибка авторизации.'));
    return;
  }
  req.user = payload;
  next();
}
