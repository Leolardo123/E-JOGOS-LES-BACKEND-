import PlaceTypesController from "@modules/controller/PlaceTypesController";
import { index } from "@shared/validation/Universal.validation";
import { Router } from "express";

const placeTypesRouter = Router();
const placeTypesController = new PlaceTypesController();

placeTypesRouter.get('/',index,placeTypesController.indexPlaceTypes)

export default placeTypesRouter