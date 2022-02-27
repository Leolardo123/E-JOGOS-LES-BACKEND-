import UsersController from "@modules/controller/UsersController";
import { Router } from "express";
import { create, index, show } from "./validation/UserRoutes.validation";

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/', create, userController.create)

userRouter.put('/', create, userController.update)

userRouter.get('/', index,userController.index)

userRouter.get('/:id', show, userController.show)

userRouter.delete('/', create, userController.delete)

export default userRouter