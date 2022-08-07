import AddressesTypesController from "@modules/controller/AddressesTypesController";
import { index } from "@shared/validation/Universal.validation";
import { Router } from "express";

const addressTypesRouter = Router();
const addressTypesController = new AddressesTypesController();

addressTypesRouter.get('/',index,addressTypesController.indexAddressTypes)

export default addressTypesRouter