import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import { celebrate } from 'celebrate';

import auth from './middleware/auth';
import users from './routes/users';
import cards from './routes/cards';
import processError from './utils/process-error';
import NotFoundError from './utils/not-found-error';
import { createUser, login } from './controllers/users';
import { userSchema } from './constants/celebrate-schemas';
import { requestLogger, errorLogger } from './middleware/logger';

const app = express();
const PORT = 3000;

// Process all jsons
app.use(express.json());

// Populate req.cookies
app.use(cookieParser());

// Request logger
app.use(requestLogger);

// Unprotected routes
app.post('/signin', login);
app.post('/signup', celebrate(userSchema), createUser);

// Check the token and populate req.user or throw
app.use(auth);

// Protected routes
app.use('/users', users);
app.use('/cards', cards);
app.use((_, __, next) => {
  next(new NotFoundError('Запрошенного эндпойнта не существует.'));
});

// Error logger
app.use(errorLogger);

// Error processor
app.use(processError);

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb');
