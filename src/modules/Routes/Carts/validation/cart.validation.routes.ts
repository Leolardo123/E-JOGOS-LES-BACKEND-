import { celebrate, Joi, Segments } from "celebrate";

export const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        items: Joi.array().items(
            Joi.object().keys({
                quantity: Joi.number().required(),
                product_id: Joi.string().required(),
                cart_id: Joi.string().required(),
            })
        ).min(1).required(),
    })
});

export const update = celebrate({
    [Segments.BODY]: Joi.object().keys({
        total_price: Joi.number().required(),
        items: Joi.array().items(
            Joi.object().keys({
                quantity: Joi.number().required(),
                price: Joi.number().required(),
                product_id: Joi.string().required(),
                cart_id: Joi.string().required(),
            })
        ).min(1).required(),
    })
});

export const index = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1),
        limit: Joi.number().min(1),
    }),
});

export const show = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
});

export const remove = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required(),
    }),
});