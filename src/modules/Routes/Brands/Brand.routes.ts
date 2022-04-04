import BrandsController from "@modules/controller/BrandsController";
import { Router } from "express";

const brandRouter = Router();
const brandsController = new BrandsController();

brandRouter.get('/:id', brandsController.show)
brandRouter.get('/', brandsController.index)
brandRouter.post('/', brandsController.create)
brandRouter.put('/', brandsController.update)
brandRouter.delete('/', brandsController.delete)

export default brandRouter