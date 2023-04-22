import { Response } from 'express';

import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from '../constants/status-codes';

export default async function processError (res: Response, err: Error) {
  let status = STATUS_SERVER_ERROR;
  let message = 'Ошибка сервера';
  if (err.message.startsWith('ValidationError') || err.message.startsWith('user validation error')) {
    status = STATUS_BAD_REQUEST;
    message = err.message.split(': ').pop()!;
  }
  if (err.name === 'CastError') {
    status = STATUS_BAD_REQUEST;
    message = 'Передан неверный _id';
  }
  if (err.message.startsWith('Not found')) {
    status = STATUS_NOT_FOUND;
    message = err.message.split(': ').pop()!;
  }
  if (err.message.includes('duplicate key error')) {
    status = STATUS_BAD_REQUEST;
    message = 'Пользователь с таким мылом уже зарегестрирован.';
  }
  console.log(err);
  return res.status(status).send({ message });
}
