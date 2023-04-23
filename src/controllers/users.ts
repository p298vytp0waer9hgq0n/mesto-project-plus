import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import processError from '../utils/process-error';
import { STATUS_CREATED, STATUS_OK } from '../constants/status-codes';
import { SECRET } from '../constants/secret';

export const getUsers = (_: Request, res: Response) => {
  User.find({}, { __v: 0 })
    .then((data) => res.status(STATUS_OK).send({ data }))
    .catch((err) => processError(res, err));
};

export const getUser = (req: Request, res: Response) => {
  const id = req.params.userId;
  return User.findById(id, { __v: 0 })
    .then((user) => {
      if (!user) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send(user);
    })
    .catch((err) => processError(res, err));
};

export const getSelf = (req: Request, res: Response) => {
  const id = req.user!._id;
  return User.findById(id, { __v: 0 })
    .then((user) => {
      if (!user) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send(user);
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
  const hash = password ? bcrypt.hashSync(password, 10) : '';
  return User.create({
    name,
    password: hash,
    email,
    about,
    avatar,
  })
    .then((user) => {
      const { password: _, ...output } = user.toObject();
      res.status(STATUS_CREATED).send(output);
    })
    .catch((err) => processError(res, err));
};

export const modifyUser = (req: Request, res: Response) => {
  const { name, about } = req.body;
  // req.user should definetely exist here, otherwise auth.ts middleware would have thrown
  const { user } = req;
  return User.findByIdAndUpdate(user!._id, { name, about }, { new: true, select: '-__v', runValidators: true })
    .then((data) => {
      if (!data) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send(data);
    })
    .catch((err) => processError(res, err));
};

export const modifyAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const { user } = req;
  return User.findByIdAndUpdate(user!._id, { avatar }, { new: true, select: '-__v' })
    .then((updatedUser) => {
      if (!updatedUser) throw new Error('Not found: Пользователь с переданным id не найден.');
      return res.status(STATUS_OK).send({ id: updatedUser._id });
    })
    .catch((err) => processError(res, err));
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new Error('Неправильное имя пользователя или пароль.');
      const match = bcrypt.compareSync(password, user.password);
      if (!match) throw new Error('Неправильное имя пользователя или пароль.');
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 3600000 }).send();
    });
};
