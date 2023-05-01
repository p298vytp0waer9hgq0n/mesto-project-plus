import { NextFunction, Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';

import {
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
  STATUS_NOT_FOUND,
  STATUS_SERVER_ERROR,
} from '../constants/status-codes';
import { notFoundPrefix, authPrefix } from '../constants/errors';

export default function processError (err: Error, _: Request, res: Response, __: NextFunction) {
  let status = STATUS_SERVER_ERROR;
  let message = 'Ошибка сервера';
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
  if (err.message.startsWith(notFoundPrefix)) {
    status = STATUS_NOT_FOUND;
    message = err.message.split(': ').pop() || 'Запрошенные данные не найдены.';
  }
  if (err.message.startsWith(authPrefix)) {
    status = STATUS_NOT_FOUND;
    message = err.message.split(': ').pop() || 'Ошибка авторизации.';
  }
  return res.status(status).send({ message });
}
