import { Response } from 'express';

export default async function processError (res: Response, err: Error) {
  let status = 500;
  let { message } = err;
  if (err.name === 'ValidationError') status = 400;
  if (err.name === 'CastError') {
    status = 400;
    message = 'Cast Error: Передан неверный _id';
  }
  if (err.message.startsWith('Not found')) status = 404;
  return res.status(status).send({ message });
}
