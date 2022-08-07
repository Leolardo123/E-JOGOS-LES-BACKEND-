import addressRouter from "@modules/addresses/Address.routes"
import brandRouter from "@modules/cards/Brand.routes"
import cardRouter from "@modules/cards/Card.routes"
import productRouter from "@modules/products/routes/Products.routes"
import genderRouter from "@modules/users/routes/gender.routes"
import personRouter from "@modules/users/routes/person.routes"
import { sessionsRouter } from "@modules/users/routes/sessions.routes"
import userRouter from "@modules/users/routes/User.routes"
import { Router } from "express"

const routes = Router()

routes.use('/addresses', addressRouter)

routes.use('/brands', brandRouter)

routes.use('/cards', cardRouter)

routes.use('/genders', genderRouter)

routes.use('/persons', personRouter)

routes.use('/products', productRouter)

routes.use('/sessions', sessionsRouter)

routes.use('/users', userRouter)

export default routes