import { celebrate, Joi, Segments } from "celebrate";

export const index = celebrate({
  [Segments.BODY]: {
    user_id: Joi.string().optional(),
  },
});

export const show = celebrate({
  [Segments.BODY]: {
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

export const addToPerson = celebrate({
  [Segments.BODY]: {
    addresses: Joi.array().items(
      Joi.object({
          cep: Joi.string().required(),
          place: Joi.string().required(),
          number: Joi.number().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          country: Joi.string().required(),
          complement: Joi.string().allow('',null),
          neighborhood: Joi.string().required(),
          address_type_id: Joi.number().required(),
          place_type_id: Joi.number().required(),
      }).required()
    ).min(1).required()
  },
});

export const update = celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    user_id: Joi.string().required(),
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

export const deleteBody = celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    user_id: Joi.string().required(),
  },
})


