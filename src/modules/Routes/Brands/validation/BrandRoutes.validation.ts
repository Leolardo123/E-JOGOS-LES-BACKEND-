import { celebrate, Joi, Segments } from "celebrate";

const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().required(),
    })
})

const update = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        brand: Joi.object().keys({
            name: Joi.string(),
            image: Joi.string(),
        })
    })
})

export { create, update };