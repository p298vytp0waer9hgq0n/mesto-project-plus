import { Schema, model } from 'mongoose';

type User = {
  name: String,
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
