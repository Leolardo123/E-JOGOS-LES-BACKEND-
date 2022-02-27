import { Router } from "express";
import { create } from "./validation/UserRoutes.validation";

const userRouter = Router();

userRouter.post('/',create/* Validate Params *//*Execute controller*/)

userRouter.put('/',/* Validate Params *//*Execute controller*/)

userRouter.get('/',/* Validate Params *//*Execute controller*/)

userRouter.get('/:id',/* Validate Params *//*Execute controller*/)

userRouter.delete('/',/* Validate Params *//*Execute controller*/)

export default userRouter