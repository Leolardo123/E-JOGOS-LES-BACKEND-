
import GendersController from "@modules/controller/GendersController";
import { index } from "@shared/validation/Universal.validation";
import { Router } from "express";

const genderRouter = Router();
const genderController = new GendersController();

genderRouter.get('/', index, genderController.indexGenders)

export default genderRouter