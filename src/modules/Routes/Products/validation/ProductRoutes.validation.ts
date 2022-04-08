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
            guarantee: Joi.string().required(),
            language: Joi.string().required(),
            subtitle: Joi.string().required(),
            release_date: Joi.string().required(),
            recomended_age: Joi.number().required(),
            players_offline: Joi.number().required(),
            players_online: Joi.number().required(),
            resolution: Joi.string().required(),
            image: Joi.string().required(),
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
            guarantee: Joi.string(),
            language: Joi.string(),
            subtitle: Joi.string(),
            release_date: Joi.string(),
            recomended_age: Joi.number(),
            players_offline: Joi.number(),
            players_online: Joi.number(),
            resolution: Joi.string(),
            image: Joi.string(),
        }).required()
    })
})