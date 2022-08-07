import { SessionController } from '@modules/users/controllers/SessionController';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import { UserRefreshTokenController } from '../controllers/UserRefreshTokenController';
import { create, refreshToken } from './validation/sessions.validation';

const sessionsRouter = Router();

const sessionController = new SessionController();
const userRefreshTokenController = new UserRefreshTokenController();

sessionsRouter.post('/', create, sessionController.create);

sessionsRouter.put(
  '/refresh-token',
  refreshToken,
  userRefreshTokenController.update,
);

sessionsRouter.delete(
  '/logout',
  ensureAuthenticated,
  userRefreshTokenController.delete,
);

export { sessionsRouter };
