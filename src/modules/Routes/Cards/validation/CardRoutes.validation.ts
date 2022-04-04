import { celebrate, Joi, Segments } from "celebrate";

const index = celebrate({
    [Segments.BODY]: Joi.object().keys({
        person_id: Joi.string().required()
    })
});

const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        owner_name: Joi.string().required(),
        number: Joi.string().required(),
        brand_id: Joi.string().required(),
        person_id: Joi.string().required(),
        security_code: Joi.string().required()
    })
})

const update = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        card: Joi.object().keys({
            owner_name: Joi.string(),
            number: Joi.string(),
            brand_id: Joi.string(),
            person_id: Joi.string(),
            security_code: Joi.string(),
        })
    })
})

export { create, update, index };