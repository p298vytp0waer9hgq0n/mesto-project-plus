import { NextFunction, Request, Response } from 'express';

import Card from '../models/card';
import NotFoundError from '../utils/not-found-error';
import ForbiddenError from '../utils/forbidden-error';
import { STATUS_CREATED, STATUS_OK } from '../constants/status-codes';
import { messageCardNotAllowed, messageCardNotFound } from '../constants/messages';

export const getCards = (_: Request, res: Response, next: NextFunction) => {
  Card.find({}, { __v: 0 })
    .populate('owner')
    .populate('likes')
    .then((data) => res.status(STATUS_OK).send({ data }))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.cardId;
  const userId = req.user!._id;
  return Card.findOne({ _id: id })
    .then((card) => {
      if (!card) throw new NotFoundError(messageCardNotFound);
    })
    .then(() => Card.findOneAndDelete({ _id: id, owner: userId }, { __v: 0 }))
    .then((card) => {
      if (!card) throw new ForbiddenError(messageCardNotAllowed);
      return res.status(STATUS_OK).send({ id: card._id });
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const { user } = req;
  // req.user exists because of the auth middleware
  return Card.create({ name, link, owner: user!._id })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.cardId;
  const { user } = req;
  return Card.findByIdAndUpdate(id, { $addToSet: { likes: user!._id } }, { new: true, select: 'likes' })
    .then((data) => {
      if (!data) throw new NotFoundError(messageCardNotFound);
      return res.status(STATUS_OK).send(data);
    })
    .catch(next);
};

export const removeLikeCard = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.cardId;
  const { user } = req;
  return Card.findByIdAndUpdate(id, { $pull: { likes: user!._id } }, { new: true, select: 'likes' })
    .then((data) => {
      if (!data) throw new NotFoundError(messageCardNotFound);
      return res.status(STATUS_OK).send(data);
    })
    .catch(next);
};
