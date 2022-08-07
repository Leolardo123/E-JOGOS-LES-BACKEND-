import CardsController from "@modules/cards/controllers/CardsController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import { create, index, show, update } from "./validation/CardRoutes.validation";

const cardRouter = Router();
const cardsController = new CardsController();

cardRouter.use(ensureAuthenticated);

cardRouter.get('/index', index, cardsController.index)

cardRouter.post('/show', show, cardsController.show)

cardRouter.post('/', create, cardsController.create)

cardRouter.put('/', update, cardsController.update)

cardRouter.delete('/:id', cardsController.delete)

export default cardRouter