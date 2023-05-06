import { Response } from 'express';

import User from '../models/user';
import NotFoundError from '../utils/not-found-error';
import { messageUserNotFound } from '../constants/messages';
import { STATUS_OK } from '../constants/status-codes';

export function findUserById (id: string, res: Response) {
  return User.findById(id, { __v: 0 })
    .then((user) => {
      if (!user) throw new NotFoundError(messageUserNotFound);
      return res.status(STATUS_OK).send(user);
    });
}

export function findModifyUser (
  id: string,
  {
    name = undefined,
    about = undefined,
    avatar = undefined,
  },
  res: Response,
) {
  return User.findByIdAndUpdate(id, { name, about, avatar }, { new: true, select: '-__v', runValidators: true })
    .then((data) => {
      if (!data) throw new NotFoundError(messageUserNotFound);
      return res.status(STATUS_OK).send(data);
    });
}
