import { Router } from "express";
import { show } from "./validation/AdressRoutes.validation";

const addressRouter = Router();

addressRouter.post('/',/* Validate Params *//*Execute controller*/)

addressRouter.put('/',/* Validate Params *//*Execute controller*/)

addressRouter.get('/',/* Validate Params *//*Execute controller*/)

addressRouter.get('/:id',show/* Validate Params *//*Execute controller*/)

addressRouter.delete('/',/* Validate Params *//*Execute controller*/)

export default addressRouter