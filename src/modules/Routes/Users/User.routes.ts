import UsersController from "@modules/controller/UsersController";
import { Router } from "express";
import { create, index, show, updateBody, updateParams } from "./validation/userRoutes.validation";

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/', create, userController.create)

userRouter.put('/:user_id', updateBody, updateParams, userController.update)

userRouter.get('/', index,userController.index)

userRouter.get('/:id', show, userController.show)

userRouter.delete('/:id', create, userController.delete)

export default userRouter