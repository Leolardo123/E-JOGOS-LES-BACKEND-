import AddressesController from "@modules/controller/AddressesController";
import { index as uIndex } from "@shared/validation/Universal.validation";
import { Router } from "express";
import { index, show, updateBody, updateParams } from "./validation/AddressRoutes.validation";

const addressRouter = Router();
const addressController = new AddressesController();

addressRouter.get('/types',uIndex,addressController.indexAddressTypes)

addressRouter.get('/places-types',uIndex,addressController.indexPlaceTypes)

addressRouter.put('/:address_id',updateBody,updateParams,addressController.update)

addressRouter.get('/',index,addressController.index)

addressRouter.get('/:id',show,addressController.show)

addressRouter.delete('/',)

export default addressRouter