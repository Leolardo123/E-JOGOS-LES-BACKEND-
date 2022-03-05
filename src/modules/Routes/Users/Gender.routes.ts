
import GendersController from "@modules/controller/GendersController";
import { Router } from "express";
import { index } from "./validation/UserRoutes.validation";

const genderRouter = Router();
const genderController = new GendersController();

genderRouter.get('/genders', index, genderController.indexGenders)

export default genderRouter