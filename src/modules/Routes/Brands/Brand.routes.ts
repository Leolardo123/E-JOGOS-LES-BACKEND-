import BrandsController from "@modules/controller/BrandsController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";

const brandRouter = Router();
const brandsController = new BrandsController();

brandRouter.use(ensureAuthenticated);

brandRouter.get('/', brandsController.show)

brandRouter.get('/index', brandsController.index)

brandRouter.post('/', brandsController.create)

brandRouter.put('/:id', brandsController.update)

brandRouter.delete('/:id', brandsController.delete)

export default brandRouter