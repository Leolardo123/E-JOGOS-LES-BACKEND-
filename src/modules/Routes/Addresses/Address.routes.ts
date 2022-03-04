import AddressesController from "@modules/controller/AddressesController";
import { index } from "@shared/validation/Universal.validation";
import { Router } from "express";
import { show } from "./validation/AdressRoutes.validation";


const addressRouter = Router();
const addressController = new AddressesController();

addressRouter.get('/types',index,addressController.indexAddressTypes)

addressRouter.get('/places-types',index,addressController.indexPlaceTypes)

addressRouter.post('/',addressController.create)

addressRouter.put('/',addressController.update)

addressRouter.get('/',index,addressController.index)

addressRouter.get('/:id',show,addressController.show)

addressRouter.delete('/',)

export default addressRouter