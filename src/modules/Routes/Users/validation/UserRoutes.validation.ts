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
            gender_id: Joi.number().required(),
            birth_date: Joi.string().required(),
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
            complement: Joi.string().allow('',null),
            neighborhood: Joi.string().required(),
            address_type_id: Joi.number().required(),
            place_type_id: Joi.number().required(),
        }).required()
    }
})

export const updateBody = celebrate({
    [Segments.BODY]: {
        user: Joi.object({
            email: Joi.string().allow('',null),
        }),
        person: Joi.object({
            name: Joi.string().allow('',null),
            cpf: Joi.string().allow('',null),
            cellphone: Joi.string().allow('',null),
            gender_id: Joi.number(),
            birth_date: Joi.string().required(),
            phone: Joi.object({
                ddd: Joi.number(),
                number: Joi.number()
            })
        }),
        address: Joi.object({
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
        })
    }
})

export const updateParams = celebrate({
    [Segments.PARAMS]: {
        user_id: Joi.string().required()
    }
})

export const show = celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
});

export const deleteUser = celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
});

export const index = celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number()
    },
});

