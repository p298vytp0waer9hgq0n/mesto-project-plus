import { NextFunction, Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';
import { isCelebrateError } from 'celebrate';

import {
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_SERVER_ERROR,
} from '../constants/status-codes';
import NotFoundError from './not-found-error';
import AuthError from './auth-error';

// eslint-disable-next-line no-unused-vars
export default function processError (err: Error, _r: Request, res: Response, _n: NextFunction) {
  let status = STATUS_SERVER_ERROR;
  let message = 'Ошибка серверa.';

  if (isCelebrateError(err)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, joiError] of err.details.entries()) {
      message = joiError.message;
    }
    status = STATUS_BAD_REQUEST;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    status = STATUS_BAD_REQUEST;
    message = err.message.split(': ').pop() || 'Ошибка валидации данных.';
  }

  if (err instanceof mongoose.Error.CastError) {
    status = STATUS_BAD_REQUEST;
    message = 'Передан неверный _id';
  }

  if (err instanceof mongo.MongoServerError && err.code === 11000 && err.keyPattern?.email === 1) {
    status = STATUS_CONFLICT;
    message = 'Пользователь с таким мылом уже зарегистрирован.';
  }

  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && err.message.includes('JSON')) {
    status = STATUS_BAD_REQUEST;
    message = 'Тело запроса содержит невалидный JSON.';
  }

  if (err instanceof NotFoundError) {
    status = err.status;
    message = err.message.split(': ').pop() || 'Запрошенные данные не найдены.';
  }

  if (err instanceof AuthError) {
    status = err.status;
    message = err.message.split(': ').pop() || 'Ошибка авторизации.';
    return res.status(status).clearCookie('token').send({ message });
  }

  return res.status(status).send({ message });
}
