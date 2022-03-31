import CardsController from "@modules/controller/CardsController";
import { Router } from "express";
import { create, index } from "./validation/CardRoutes.validation";

const cardRouter = Router();
const cardsController = new CardsController();

cardRouter.get('/', index, function() {
    console.log('teste')
})

cardRouter.post('/', create, cardsController.create)

export default cardRouter