import express from 'express';
import cookieParser from 'cookie-parser';
import { celebrate } from 'celebrate';

import auth from '../middleware/auth';
import users from './users';
import cards from './cards';
import processError from '../utils/process-error';
import NotFoundError from '../utils/not-found-error';
import { createUser, login } from '../controllers/users';
import { userSchema } from '../constants/celebrate-schemas';
import { requestLogger, errorLogger } from '../middleware/logger';

const router = express.Router();

// Process all jsons
router.use(express.json());

// Populate req.cookies
router.use(cookieParser());

// Request logger
router.use(requestLogger);

// Unprotected routes
router.post('/signin', login);
router.post('/signup', celebrate(userSchema), createUser);

// Check the token and populate req.user or throw
router.use(auth);

// Protected routes
router.use('/users', users);
router.use('/cards', cards);
router.use((_, __, next) => {
  next(new NotFoundError('Запрошенного эндпойнта не существует.'));
});

// Error logger
router.use(errorLogger);

// Error processor
router.use(processError);

export default router;
