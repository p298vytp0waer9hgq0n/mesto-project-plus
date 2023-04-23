import { Schema, model } from 'mongoose';
import validator from 'validator';

type User = {
  name: string,
  email: string,
  password: string,
  about: string,
  avatar: string,
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    minLength: [2, 'Имя пользователя должно быть не короче 2 символов.'],
    maxLength: [30, 'Имя пользователя должно быть не длиннее 30 символов.'],
    default: 'Жак Ив Кусто',
  },
  email: {
    type: String,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Невалидное мыло',
    },
    unique: true,
    required: [true, 'Мыло обязательно для заполнения.'],
  },
  password: {
    type: String,
    validate: {
      validator: (value: string) => value.length > 0,
      message: 'Пароль обязателен для заполнения',
    },
    required: [true, 'Пароль обязателен для заполнения.'],
    select: false,
  },
  about: {
    type: String,
    minLength: [2, 'Информация о пользователе должна быть не короче 2 символов.'],
    maxLength: [200, 'Информация о пользователе должна быть не длиннее 300 символов.'],
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

export default model<User>('user', userSchema);
