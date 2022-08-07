import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { auth, create, deleteUser, index, show, updateBody, updatePassword } from "./validation/UserRoutes.validation";

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/auth', auth, userController.auth)

userRouter.get('/index', index, userController.index)

userRouter.get('/', ensureAuthenticated, show, userController.show)

userRouter.post('/', create, userController.create)

userRouter.put('/', ensureAuthenticated, updateBody, userController.update)

userRouter.delete('/', ensureAuthenticated, deleteUser, userController.delete)

export default userRouter