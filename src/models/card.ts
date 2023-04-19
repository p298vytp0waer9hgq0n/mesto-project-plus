import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

type Card = {
  name: String;
  link: String;
  owner: ObjectId;
  likes: Array<ObjectId>;
  createdAt: Date;
}

const cardSchema = new Schema<Card>({
  name: {
    type: String,
    minLength: [2, 'Имя карточки должно быть не короче 2 символов.'],
    maxLength: [30, 'Имя карточки должно быть не длиннее 30 символов.'],
    required: [true, 'Имя карточки обязательно для заполнения.'],
  },
  link: {
    type: String,
    required: [true, 'Ссылка на изображение обязательна для заполнения.'],
  },
  owner: {
    type: ObjectId,
    required: [true, 'Идентификатор пользователя обязателен для заполнения.'],
  },
  likes: {
    type: [ObjectId],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
/* cardSchema.post('save', { document: true }, function (doc) {
  doc = doc.toObject();
  delete doc.__v;
  console.log(doc);
}); */

export default model('card', cardSchema);
