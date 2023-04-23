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
    required: [true, 'Имя пользователя обязательно для заполнения.'],
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
  },
  about: {
    type: String,
    minLength: [2, 'Информация о пользователе должна быть не короче 2 символов.'],
    maxLength: [200, 'Информация о пользователе должна быть не длиннее 300 символов.'],
    required: [true, 'Информация о пользователе обязательна для заполнения'],
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на аватар обязательна для заполнения'],
  },
});

export default model<User>('user', userSchema);
