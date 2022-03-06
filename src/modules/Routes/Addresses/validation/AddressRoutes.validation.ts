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
    complement: Joi.string().allow('',null),
    neighborhood: Joi.string().required(),
    address_type_id: Joi.number().required(),
    place_type_id: Joi.string().required(),
  },
});

export const updateBody = celebrate({
  [Segments.BODY]: {
    cep: Joi.string().allow('',null),
    place: Joi.string().allow('',null),
    number: Joi.number(),
    city: Joi.string().allow('',null),
    state: Joi.string().allow('',null),
    country: Joi.string().allow('',null),
    complement: Joi.string().allow('',null),
    neighborhood: Joi.string().allow('',null),
    address_type_id: Joi.number(),
    place_type_id: Joi.number(),
  },
});

export const updateParams = celebrate({
  [Segments.PARAMS]: {
      address_id: Joi.string().required()
  }
})

