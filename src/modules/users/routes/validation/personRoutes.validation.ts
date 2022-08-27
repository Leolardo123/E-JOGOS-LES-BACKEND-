import { celebrate, Joi, Segments } from "celebrate";

export const updateBody = celebrate({
    [Segments.BODY]: {
        name: Joi.string().allow('', null),
        cpf: Joi.string().allow('', null),
        cellphone: Joi.string().allow('', null),
        gender_id: Joi.number(),
        birth_date: Joi.string(),
        phone: Joi.object({
            ddd: Joi.number(),
            number: Joi.number()
        })
    }
})

export const updateParams = celebrate({
    [Segments.PARAMS]: {
        person_id: Joi.string().required()
    }
})

