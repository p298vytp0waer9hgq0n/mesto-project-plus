import express from 'express';
import {
  createUser,
  getUser,
  getUsers,
  modifyAvatar,
  modifyUser,
} from '../controllers/users';

const router = express.Router();
router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', modifyUser);
router.patch('/me/avatar', modifyAvatar);

export default router;
