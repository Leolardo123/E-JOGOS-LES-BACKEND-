import { celebrate, Joi, Segments } from "celebrate";

export const index = celebrate({
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.string().required()
    })
});

export const show = celebrate({
    [Segments.BODY]: {
        id: Joi.string().required(),
        user_id: Joi.string().required()
    },
})

export const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        owner_name: Joi.string().required(),
        number: Joi.string().required(),
        brand_id: Joi.string().required(),
        user_id: Joi.string().required(),
        security_code: Joi.string().required()
    })
})

export const update = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        user_id: Joi.string().required(),
        card: Joi.object().keys({
            owner_name: Joi.string(),
            number: Joi.string(),
            brand_id: Joi.string(),
            security_code: Joi.string(),
        })
    })
})
