import BrandsController from "@modules/controller/BrandsController";
import { Router } from "express";
import { create, update } from "./validation/BrandRoutes.validation";

const brandRouter = Router();
const brandsController = new BrandsController();

brandRouter.get('/', brandsController.show)
brandRouter.get('/index', brandsController.index)
brandRouter.post('/', create, brandsController.create)
brandRouter.put('/', update, brandsController.update)
brandRouter.delete('/:id', brandsController.delete)

export default brandRouter