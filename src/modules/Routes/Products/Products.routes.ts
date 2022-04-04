import ProductsController from "@modules/controller/ProductController";
import { Router } from "express";
import { create } from "./validation/ProductRoutes.validation";

const productRouter = Router();
const productsController = new ProductsController();

productRouter.post('/', create, productsController.create)

export default productRouter