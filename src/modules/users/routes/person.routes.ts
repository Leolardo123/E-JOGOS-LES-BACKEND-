import { Router } from "express";
import PersonsController from "../controllers/PersonsController";
import { updateBody, updateParams } from "./validation/personRoutes.validation";

const personRouter = Router();
const personController = new PersonsController();

personRouter.put('/:person_id', updateBody, updateParams, personController.update)

export default personRouter