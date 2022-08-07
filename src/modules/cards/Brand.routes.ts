import { uploadConfig } from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import multer from "multer";
import BrandsController from "./controllers/BrandsController";

const brandRouter = Router();
const brandsController = new BrandsController();
const upload = multer(uploadConfig.multer);

brandRouter.use(ensureAuthenticated);

brandRouter.get('/', brandsController.show)

brandRouter.get('/index', brandsController.index)

brandRouter.post('/', upload.single('image'), brandsController.create)

brandRouter.put('/:id', upload.single('image'), brandsController.update)

brandRouter.delete('/:id', brandsController.delete)

export default brandRouter