import { default as express } from 'express';
import {
  getSelf,
  getUser,
  getUsers,
  modifyAvatar,
  modifyUser,
} from '../controllers/users';

const router = express.Router();
router.get('/', getUsers);
router.get('/me', getSelf);
router.get('/:userId', getUser);
router.patch('/me', modifyUser);
router.patch('/me/avatar', modifyAvatar);

export default router;
