import { celebrate, Joi, Segments } from "celebrate";

export const show = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const create = celebrate({
  [Segments.BODY]: {
    cep: Joi.string().required(),
    place: Joi.string().required(),
    number: Joi.number().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    address_: Joi.string().required(),
    complement: Joi.string().allow('',undefined),
    neighborhood: Joi.string().required(),
    address_type_id: Joi.number().required(),
    place_type_id: Joi.string().required(),
  },
});

export const update = celebrate({
  [Segments.BODY]: {
    cep: Joi.string().allow('',undefined),
    place: Joi.string().allow('',undefined),
    number: Joi.number(),
    city: Joi.string().allow('',undefined),
    state: Joi.string().allow('',undefined),
    country: Joi.string().allow('',undefined),
    address_: Joi.string().allow('',undefined),
    complement: Joi.string().allow('',undefined),
    neighborhood: Joi.string().allow('',undefined),
    address_type_id: Joi.number(),
    place_type_id: Joi.string().allow('',undefined),
  },
});
