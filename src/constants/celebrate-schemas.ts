import { Joi, Segments } from 'celebrate';

export const userSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).allow('')
      .messages({
        'string.min': 'Имя не может быть короче {#limit} символов.',
        'string.max': 'Имя не может быть длиннее {#limit} символов.',
      }),
    about: Joi.string().min(2).max(200).allow('')
      .messages({
        'string.min': 'Инфо о пользователе не может быть короче {#limit} символов.',
        'string.max': 'Инфо о пользователе не может быть длиннее {#limit} символов.',
      }),
    email: Joi.string().required().email({ tlds: { allow: false } })
      .messages({
        'string.email': '{#invalids} передано невалидное мыло.',
        'string.empty': 'Отсутствует мыло.',
        'any.required': 'Отсутствует мыло.',
      }),
    password: Joi.string().required().min(1)
      .messages({
        'any.required': 'Отсутствует пароль.',
        'string.empty': 'Отсутствует пароль.',
      }),
    avatar: Joi.string().uri().allow('')
      .messages({
        'string.uri': 'Передана невалидная ссылка на аватар.',
      }),
  }).messages({
    'object.unknown': 'В данных присутствует нераспознанный параметр: {#label}.',
  }),
};

export const userPatchSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.empty': 'Имя пользователя не может быть пустым в этом запросе.',
        'string.min': 'Имя не может быть короче {#limit} символов.',
        'string.max': 'Имя не может быть длиннее {#limit} символов.',
      }),
    about: Joi.string().min(2).max(200)
      .messages({
        'string.empty': 'Инфо о пользователе не может быть пустым в этом запросе.',
        'string.min': 'Инфо о пользователе не может быть короче {#limit} символов.',
        'string.max': 'Инфо о пользователе не может быть длиннее {#limit} символов.',
      }),
  }).messages({
    'object.unknown': 'В данных присутствует нераспознанный параметр: {#label}.',
  }),
};

export const avatarSchema = {
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().uri()
      .messages({
        'string.empty': 'Ссылка на аватар не может быть пустой в этом запросе.',
        'string.uri': 'Передана невалидная ссылка на аватар.',
      }),
  }).messages({
    'object.unknown': 'В данных присутствует нераспознанный параметр: {#label}.',
  }),
};

export const cardIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().alphanum().length(24)
      .message('Передан невалидный id.'),
  }).messages({
    'object.unknown': 'В данных присутствует нераспознанный параметр: {#label}.',
  }),
};

export const userIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().alphanum().length(24)
      .message('Передан невалидный id.'),
  }).messages({
    'object.unknown': 'В данных присутствует нераспознанный параметр: {#label}.',
  }),
};

export const cardSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.empty': 'Отсутствует имя.',
        'string.min': 'Имя не может быть короче {#limit} символов.',
        'string.max': 'Имя не может быть длиннее {#limit} символов.',
      }),
    link: Joi.string().uri()
      .messages({
        'string.empty': 'Передана невалидная ссылка на картинку.',
        'string.uri': 'Передана невалидная ссылка на картинку.',
      }),
  }).messages({
    'object.unknown': 'В данных присутствует нераспознанный параметр: {#label}.',
  }),
};
