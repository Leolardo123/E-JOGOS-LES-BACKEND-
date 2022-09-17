import ProductsController from "@modules/controller/ProductController";
import { Router } from "express";
import { create, update } from "./validation/ProductRoutes.validation";

const productRouter = Router();
const productsController = new ProductsController();

productRouter.post('/', create, productsController.create)
productRouter.put('/:id', update, productsController.update)
productRouter.delete('/:id', productsController.delete)
productRouter.get('/:id', productsController.show)
productRouter.get('/', productsController.index)

export default productRouter