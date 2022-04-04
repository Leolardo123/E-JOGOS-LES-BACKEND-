import { celebrate, Joi, Segments } from "celebrate";

const create = celebrate({
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
        }).required()
    })
})

export { create };