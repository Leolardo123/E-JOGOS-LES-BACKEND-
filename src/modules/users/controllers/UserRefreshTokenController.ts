import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvalidateRefreshTokenService } from '../services/InvalidateRefreshTokenService';
import { UpdateRefreshTokenService } from '../services/UpdateRefreshTokenService';

class UserRefreshTokenController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const updateRefreshToken = container.resolve(UpdateRefreshTokenService);

    const refreshToken = await updateRefreshToken.execute(refresh_token);

    return response.json(refreshToken);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const token = request.headers.authorization;

    const invalidateRefreshToken = container.resolve(
      InvalidateRefreshTokenService,
    );

    await invalidateRefreshToken.execute({
      userId,
      accessToken: token as string,
    });

    return response.status(204).json();
  }
}

export { UserRefreshTokenController };
