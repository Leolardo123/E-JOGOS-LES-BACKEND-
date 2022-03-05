import addressRouter from '@modules/Routes/Addresses/Address.routes'
import addressTypesRouter from '@modules/Routes/Addresses/AddressType.routes'
import placeTypesRouter from '@modules/Routes/Addresses/PlaceType.routes'
import genderRouter from '@modules/Routes/Users/Gender.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/addresses',addressRouter)

routes.use('/genders',genderRouter)

routes.use('/places-types',placeTypesRouter)

routes.use('/addresses-types',addressTypesRouter)

export default routes