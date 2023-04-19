import { Request, Response } from 'express';

import Card from '../models/card';
import processError from '../utils/process-error';

export const getCards = (_: Request, res: Response) => {
  Card.find({}, { __v: 0 })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
export const deleteCard = (req: Request, res: Response) => {
  const id = req.params.cardId;
  return Card.findByIdAndDelete(id, { __v: 0 })
    .then((card) => {
      if (!card) throw new Error('Not found: Карточка с переданным id не найдена.');
      return res.status(200).send({ id: card._id });
    })
    .catch((err) => processError(res, err));
};
export const createCard = (req: Request, res: Response) => {
  const { name, link, user } = req.body;
  return Card.create({ name, link, owner: user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => processError(res, err));
};
export const likeCard = (req: Request, res: Response) => {
  const id = req.params.cardId;
  const { user } = req.body;
  return Card.findByIdAndUpdate(id, { $addToSet: { likes: user._id } }, { new: true, select: 'likes' })
    .then((data) => {
      if (!data) throw new Error('Not found: Карточка с переданным id не найдена.');
      return res.status(200).send(data);
    })
    .catch((err) => processError(res, err));
};
export const removeLikeCard = (req: Request, res: Response) => {
  const id = req.params.cardId;
  const { user } = req.body;
  return Card.findByIdAndUpdate(id, { $pull: { likes: user._id } }, { new: true, select: 'likes' })
    .then((data) => {
      if (!data) throw new Error('Not found: Карточка с переданным id не найдена.');
      return res.status(200).send(data);
    })
    .catch((err) => processError(res, err));
};
