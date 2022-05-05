import BrandsController from "@modules/controller/BrandsController";
import { Router } from "express";
import { create, update } from "./validation/BrandRoutes.validation";

const brandRouter = Router();
const brandsController = new BrandsController();

brandRouter.get('/', brandsController.show)
brandRouter.get('/index', brandsController.index)
brandRouter.post('/', brandsController.create)
brandRouter.put('/:id', brandsController.update)
brandRouter.delete('/:id', brandsController.delete)

export default brandRouter