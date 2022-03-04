import addressRouter from '@modules/Routes/Addresses/Address.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/addresses',addressRouter)

export default routes