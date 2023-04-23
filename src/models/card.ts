import { ObjectId, Schema, model } from 'mongoose';

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
    required: [true, 'Ссылка на изображение обязательна для заполнения.'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Идентификатор пользователя обязателен для заполнения.'],
  },
  likes: {
    type: [Schema.Types.ObjectId],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('card', cardSchema);
