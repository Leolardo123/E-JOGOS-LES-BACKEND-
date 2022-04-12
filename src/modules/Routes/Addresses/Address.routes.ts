import AddressesController from "@modules/controller/AddressesController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { index as uIndex } from "@shared/validation/Universal.validation";
import { Router } from "express";
import { deleteBody, index, show, update } from "./validation/AddressRoutes.validation";

const addressRouter = Router();
const addressController = new AddressesController();

addressRouter.get('/types', uIndex,addressController.indexAddressTypes)

addressRouter.get('/places-types', uIndex,addressController.indexPlaceTypes)

addressRouter.put('/', ensureAuthenticated, update,addressController.update)

addressRouter.get('/', index, addressController.index)

addressRouter.post('/', index, addressController.create)

addressRouter.post('/show', show, addressController.show)

addressRouter.delete('/', ensureAuthenticated, deleteBody, addressController.delete)

export default addressRouter