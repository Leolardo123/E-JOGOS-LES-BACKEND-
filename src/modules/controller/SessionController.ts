import { AuthenticateUserService } from '@modules/Services/Users/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const {
      user,
      access_token,
      refresh_token,
    } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({
      user,
      access_token,
      refresh_token,
    });
  }
}

export { SessionController };
