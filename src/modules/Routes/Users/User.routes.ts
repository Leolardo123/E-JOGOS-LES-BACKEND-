import UsersController from "@modules/controller/UsersController";
import { Router } from "express";
import { create, deleteUser, index, show, updateBody, updateParams, updatePassword } from "./validation/UserRoutes.validation";

const userRouter = Router();
const userController = new UsersController();

userRouter.get('/index', index,userController.index)

userRouter.get('/', show, userController.show)

userRouter.post('/', create, userController.create)

userRouter.put('/:user_id', updateBody, updateParams, userController.update)

userRouter.put('/password', updatePassword, userController.updatePassword)

userRouter.delete('/:user_id', deleteUser, userController.delete)

export default userRouter