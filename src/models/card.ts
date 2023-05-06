import { ObjectId, Schema, model } from 'mongoose';
import validator from 'validator';

type Card = {
  name: string;
  link: string;
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
    validate: {
      validator: (value: string) => validator.isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
      message: 'Невалидная ссылка на картинку.',
    },
    required: [true, 'Ссылка на изображение обязательна для заполнения.'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Идентификатор пользователя обязателен для заполнения.'],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('card', cardSchema);
