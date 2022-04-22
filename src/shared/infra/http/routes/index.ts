import addressRouter from "@modules/Routes/Addresses/Address.routes"
import addressTypesRouter from "@modules/Routes/Addresses/AddressType.routes"
import placeTypesRouter from "@modules/Routes/Addresses/PlaceType.routes"
import brandRouter from "@modules/Routes/Brands/Brand.routes"
import cardRouter from "@modules/Routes/Cards/Card.routes"
import productRouter from "@modules/Routes/Products/Products.routes"
import genderRouter from "@modules/Routes/Users/gender.routes"

import personRouter from "@modules/Routes/Users/person.routes"
import { sessionsRouter } from "@modules/Routes/Users/sessions.routes"
import userRouter from "@modules/Routes/Users/User.routes"
import { Router } from "express"


const routes = Router()

routes.use('/addresses',addressRouter)

routes.use('/addresses-types',addressTypesRouter)

routes.use('/brands',brandRouter)

routes.use('/cards',cardRouter)

routes.use('/genders',genderRouter)

routes.use('/places-types',placeTypesRouter)

routes.use('/persons',personRouter)

routes.use('/products',productRouter)

routes.use('/sessions',sessionsRouter)

routes.use('/users',userRouter)

export default routes