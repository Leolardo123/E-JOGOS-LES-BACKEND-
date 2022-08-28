import { celebrate, Joi, Segments } from "celebrate";

export const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        product: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            requirements: Joi.string().required(),
            publisher: Joi.string().required(),
            developer: Joi.string().required(),
            language: Joi.string().required(),
            subtitle: Joi.string().required(),
            release_date: Joi.string().required(),
        }).required()
    })
})

export const update = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        product: Joi.object().keys({
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number(),
            stock: Joi.number(),
            requirements: Joi.string(),
            publisher: Joi.string(),
            developer: Joi.string(),
            language: Joi.string(),
            subtitle: Joi.string(),
            release_date: Joi.string(),
        }).required()
    })
})