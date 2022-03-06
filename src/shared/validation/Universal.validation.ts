import { celebrate, Joi, Segments } from "celebrate";

export const index = celebrate({
  [Segments.PARAMS]: {
    page: Joi.number(),
    limit: Joi.number(),
  },
});
