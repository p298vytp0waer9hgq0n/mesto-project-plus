import express from 'express';

import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  removeLikeCard,
} from '../controllers/cards';

const router = express.Router();
router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', removeLikeCard);

export default router;
