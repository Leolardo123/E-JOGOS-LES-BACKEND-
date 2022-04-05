import CardsController from "@modules/controller/CardsController";
import { Router } from "express";
import { create, index, update } from "./validation/CardRoutes.validation";

const cardRouter = Router();
const cardsController = new CardsController();

cardRouter.get('/index', index, cardsController.index)

cardRouter.get('/', cardsController.show)

cardRouter.post('/', create, cardsController.create)

cardRouter.put('/', cardsController.update)

cardRouter.delete('/', cardsController.delete)

export default cardRouter