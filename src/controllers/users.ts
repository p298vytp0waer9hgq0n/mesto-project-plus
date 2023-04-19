import { Request, Response } from 'express';

import User from '../models/user';
import processError from '../utils/process-error';

export const getUsers = (_: Request, res: Response) => {
  User.find({}, { __v: 0 })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => res.status(500).send({ message: err }));
};
export const getUser = (req: Request, res: Response) => {
  const id = req.params.userId;
  return User.findById(id, { __v: 0 })
    .then((card) => {
      if (!card) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(200).send({ id: card._id });
    })
    .catch((err) => processError(res, err));
};
export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ _id: user._id }))
    .catch((err) => processError(res, err));
};
export const modifyUser = (req: Request, res: Response) => {
  const { name, about, user } = req.body;
  return User.findByIdAndUpdate(user._id, { name, about }, { new: true, select: '-__v', runValidators: true })
    .then((data) => {
      if (!data) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(200).send(data);
    })
    .catch((err) => processError(res, err));
};
export const modifyAvatar = (req: Request, res: Response) => {
  const { avatar, user } = req.body;
  return User.findByIdAndUpdate(user._id, { avatar }, { new: true, select: '-__v' })
    .then((card) => {
      if (!card) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(200).send({ id: card._id });
    })
    .catch((err) => processError(res, err));
};
