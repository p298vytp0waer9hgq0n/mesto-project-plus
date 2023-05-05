import express from 'express';
import { celebrate } from 'celebrate';
import {
  getSelf,
  getUser,
  getUsers,
  modifyAvatar,
  modifyUser,
} from '../controllers/users';
import { avatarSchema, userIdParamSchema, userPatchSchema } from '../constants/celebrate-schemas';

const router = express.Router();
router.get('/', getUsers);
router.get('/me', getSelf);
router.get('/:userId', celebrate(userIdParamSchema), getUser);
router.patch('/me', celebrate(userPatchSchema), modifyUser);
router.patch('/me/avatar', celebrate(avatarSchema), modifyAvatar);

export default router;
