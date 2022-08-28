import { uploadConfig } from "@config/upload";
import ProductsController from "@modules/products/controllers/ProductController";
import { Router } from "express";
import multer from "multer";

import { create, update } from "./validation/ProductRoutes.validation";

const productRouter = Router();
const productsController = new ProductsController();

const upload = multer(uploadConfig.multer);

productRouter.post(
    '/', 
    upload.single('image'), 
    create, 
    productsController.create
)

productRouter.put(
    '/:id', 
    upload.single('image'), 
    update, 
    productsController.update
)
    
productRouter.delete('/:id', productsController.delete)
productRouter.get('/:id', productsController.show)
productRouter.get('/', productsController.index)

export default productRouter