import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});

export const refreshToken = celebrate({
  [Segments.BODY]: {
    refresh_token: Joi.string().required(),
  },
});
