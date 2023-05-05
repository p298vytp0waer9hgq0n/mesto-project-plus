import express from 'express';
import { celebrate } from 'celebrate';

import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  removeLikeCard,
} from '../controllers/cards';
import { cardSchema, cardIdParamSchema } from '../constants/celebrate-schemas';

const router = express.Router();
router.get('/', getCards);
router.post('/', celebrate(cardSchema), createCard);
router.delete('/:cardId', celebrate(cardIdParamSchema), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdParamSchema), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdParamSchema), removeLikeCard);

export default router;
