import addressRouter from "@modules/Routes/Addresses/Address.routes"
import addressTypesRouter from "@modules/Routes/Addresses/AddressType.routes"
import placeTypesRouter from "@modules/Routes/Addresses/PlaceType.routes"
import brandRouter from "@modules/Routes/Brand/Brand.routes"
import cardRouter from "@modules/Routes/Cards/Card.routes"
import genderRouter from "@modules/Routes/Users/Gender.routes"
import personRouter from "@modules/Routes/Users/person.routes"
import { sessionsRouter } from "@modules/Routes/Users/sessions.routes"
import userRouter from "@modules/Routes/Users/User.routes"
import { Router } from "express"


const routes = Router()

routes.use('/addresses',addressRouter)

routes.use('/genders',genderRouter)

routes.use('/places-types',placeTypesRouter)

routes.use('/addresses-types',addressTypesRouter)

routes.use('/cards',cardRouter)

routes.use('/brands',brandRouter)

routes.use('/sessions',sessionsRouter)

routes.use('/persons',personRouter)

routes.use('/users',userRouter)

export default routes