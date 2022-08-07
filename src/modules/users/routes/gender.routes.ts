import { index } from "@shared/validation/Universal.validation";
import { Router } from "express";
import GendersController from "../controllers/GendersController";

const genderRouter = Router();
const genderController = new GendersController();

genderRouter.get('/', index, genderController.indexGenders)

export default genderRouter