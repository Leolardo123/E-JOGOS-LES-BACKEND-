import { celebrate, Joi, Segments } from "celebrate";

export const create = celebrate({
    [Segments.BODY]: {
        user: Joi.object({
            email: Joi.string().required(),
            email_confirm: Joi.string().required().valid(Joi.ref('email')),
            password: Joi.string().required(),
            password_confirm: Joi.string().required().valid(Joi.ref('password'))
        }).required(),
        person: Joi.object({
            name: Joi.string().required(),
            cpf: Joi.string().required(),
            cellphone: Joi.string().required(),
            gender_id: Joi.string().required(),
            phone: Joi.object({
                ddd: Joi.number().required(),
                number: Joi.number().required()
            }).required()
        }).required(),
        address: Joi.object({
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
        }).required()
    }
})

export const show = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
});

export const index = celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number()
    },
});