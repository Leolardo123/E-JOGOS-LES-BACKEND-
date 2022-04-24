import CartsController from "@modules/controller/CartsController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import { create, index, remove, show, update } from './validation/cart.validation.routes'

const cartsRouter = Router();
const cartsController = new CartsController()

cartsRouter.use(ensureAuthenticated)

cartsRouter.get("/", index, cartsController.index);
cartsRouter.get("/:id", show, cartsController.show);
cartsRouter.post("/", create, cartsController.create);
cartsRouter.put("/:cart_id", update, cartsController.update);
cartsRouter.delete("/:id", remove, cartsController.delete);

export default cartsRouter;