import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import processError from '../utils/process-error';
import { STATUS_CREATED, STATUS_OK } from '../constants/status-codes';

export const getUsers = (_: Request, res: Response) => {
  User.find({}, { __v: 0 })
    .then((data) => res.status(STATUS_OK).send({ data }))
    .catch((err) => processError(res, err));
};

export const getUser = (req: Request, res: Response) => {
  const id = req.params.userId;
  return User.findById(id, { __v: 0 })
    .then((card) => {
      if (!card) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send({ id: card._id });
    })
    .catch((err) => processError(res, err));
};

export const createUser = (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    about,
    avatar,
  } = req.body;
  // if (!password) throw new Error('ValidationError: Пароль обязателен для заполнения');
  const hash = password ? bcrypt.hashSync(password, 10) : '';
  return User.create({
    name,
    password: hash,
    email,
    about,
    avatar,
  })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => processError(res, err));
};

export const modifyUser = (req: Request, res: Response) => {
  const { name, about, user } = req.body;
  return User.findByIdAndUpdate(user._id, { name, about }, { new: true, select: '-__v', runValidators: true })
    .then((data) => {
      if (!data) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send(data);
    })
    .catch((err) => processError(res, err));
};

export const modifyAvatar = (req: Request, res: Response) => {
  const { avatar, user } = req.body;
  return User.findByIdAndUpdate(user._id, { avatar }, { new: true, select: '-__v' })
    .then((card) => {
      if (!card) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send({ id: card._id });
    })
    .catch((err) => processError(res, err));
};
