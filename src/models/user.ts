import { Schema, model } from 'mongoose';
import validator from 'validator';

type User = {
  name: String,
  email: string,
  // password: String,
  about: String,
  avatar: String,
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    minLength: [2, 'Имя пользователя должно быть не короче 2 символов.'],
    maxLength: [30, 'Имя пользователя должно быть не длиннее 30 символов.'],
    require: [true, 'Имя пользователя обязательно для заполнения.'],
  },
  email: {
    type: String,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Невалидное мыло',
    },
    unique: true,
    require: [true, 'Мыло обязательно для заполнения.'],
  },
  // password: {},
  about: {
    type: String,
    minLength: [2, 'Информация о пользователе должна быть не короче 2 символов.'],
    maxLength: [200, 'Информация о пользователе должна быть не длиннее 300 символов.'],
    require: [true, 'Информация о пользователе обязательна для заполнения'],
  },
  avatar: {
    type: String,
    require: [true, 'Ссылка на аватар обязательна для заполнения'],
  },
});

export default model<User>('user', userSchema);
