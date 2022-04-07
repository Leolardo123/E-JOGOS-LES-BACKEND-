import CardsController from "@modules/controller/CardsController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import { create, index, show, update } from "./validation/CardRoutes.validation";

const cardRouter = Router();
const cardsController = new CardsController();

cardRouter.get('/index', ensureAuthenticated, index, cardsController.index)

cardRouter.post('/show', ensureAuthenticated, show, cardsController.show)

cardRouter.post('/', ensureAuthenticated, create, cardsController.create)

cardRouter.put('/', ensureAuthenticated, update, cardsController.update)

cardRouter.delete('/:id', ensureAuthenticated, cardsController.delete)

export default cardRouter