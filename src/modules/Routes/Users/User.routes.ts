import UsersController from "@modules/controller/UsersController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import { auth, create, deleteUser, index, show, updateBody, updatePassword } from "./validation/UserRoutes.validation";

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/auth', auth, userController.auth)

userRouter.get('/index', index, userController.index)

userRouter.get('/', ensureAuthenticated, show, userController.show)

userRouter.post('/', create, userController.create)

userRouter.put('/', ensureAuthenticated, updateBody, userController.update)

userRouter.put('/password', ensureAuthenticated, updatePassword, userController.updatePassword)

userRouter.delete('/', ensureAuthenticated, deleteUser, userController.delete)

export default userRouter