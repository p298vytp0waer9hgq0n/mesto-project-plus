import mongoose from 'mongoose';
import express from 'express';

import router from './routes';

const app = express();
const PORT = 3000;

app.use(router);

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb');
