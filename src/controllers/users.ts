import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import NotFoundError from '../utils/not-found-error';
import AuthError from '../utils/auth-error';
import { STATUS_CREATED, STATUS_OK } from '../constants/status-codes';
import SECRET from '../constants/secret';
import { messageUserNotFound, messageWrongCredentials } from '../constants/messages';

export const getUsers = (_: Request, res: Response, next: NextFunction) => {
  User.find({}, { __v: 0 })
    .then((data) => res.status(STATUS_OK).send({ data }))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  return User.findById(id, { __v: 0 })
    .then((user) => {
      if (!user) throw new NotFoundError(messageUserNotFound);
      return res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

export const getSelf = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user!._id;
  return User.findById(id, { __v: 0 })
    .then((user) => {
      if (!user) throw new NotFoundError(messageUserNotFound);
      return res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    email,
    password,
    about,
    avatar,
  } = req.body;
  const hash = password ? bcrypt.hashSync(password, 10) : '';
  return User.create({
    name: name === '' ? undefined : name,
    password: hash,
    email,
    about: about === '' ? undefined : about,
    avatar: avatar === '' ? undefined : avatar,
  })
    .then((user) => {
      const { password: _, ...output } = user.toObject();
      res.status(STATUS_CREATED).send(output);
    })
    .catch(next);
};

export const modifyUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  // req.user should definetely exist here, otherwise auth.ts middleware would have thrown
  const { user } = req;
  return User.findByIdAndUpdate(user!._id, { name, about }, { new: true, select: '-__v', runValidators: true })
    .then((data) => {
      if (!data) throw new AuthError(messageUserNotFound);
      return res.status(STATUS_OK).send(data);
    })
    .catch(next);
};

export const modifyAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { user } = req;
  return User.findByIdAndUpdate(user!._id, { avatar }, { new: true, select: '-__v' })
    .then((updatedUser) => {
      if (!updatedUser) throw new AuthError(messageUserNotFound);
      return res.status(STATUS_OK).send({ id: updatedUser._id });
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError(messageWrongCredentials);
      const match = bcrypt.compareSync(password, user.password);
      if (!match) throw new AuthError(messageWrongCredentials);
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 3600000 }).status(STATUS_OK).send();
    })
    .catch(next);
};
