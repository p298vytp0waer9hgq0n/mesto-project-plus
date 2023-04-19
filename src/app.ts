import mongoose from 'mongoose';
import express from 'express';
import users from './routes/users';
import cards from './routes/cards';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, _, next) => {
  req.body.user = {
    _id: '643f025ca1cb88264e7e23a4',
  };
  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb');
