import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import auth from './middleware/auth';
import users from './routes/users';
import cards from './routes/cards';
import processError from './utils/process-error';
import { createUser, login } from './controllers/users';

const app = express();
const PORT = 3000;

// Process all jsons
app.use(express.json());

// Populate req.cookies
app.use(cookieParser());

// Unprotected routes
app.post('/signin', login);
app.post('/signup', createUser);

// Check the token and populate req.user or throw
app.use(auth);

// Protected routes
app.use('/users', users);
app.use('/cards', cards);
app.use((_: Request, res: Response) => {
  processError(res, new Error('Not found: Запрошенного эндпойнта не существует.'));
});

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb');
