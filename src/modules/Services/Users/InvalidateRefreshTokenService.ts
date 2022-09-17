import { RefreshToken } from '@modules/models/User/RefreshToken';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import AppError from '@shared/errors/AppError';
import { injectable } from 'tsyringe';

interface IRequest {
  userId: string;
  accessToken: string;
}

@injectable()
class InvalidateRefreshTokenService {
  public async execute({ userId, accessToken }: IRequest): Promise<void> {
    const refreshTokensRepository = new GenericRepositoryProvider(RefreshToken);

    const [, token] = accessToken.split(' ');

    const checkRefreshTokenExists = await refreshTokensRepository.findOne({
      where:{
        refresh_token:token
      }
    });

    if (checkRefreshTokenExists?.user_id !== userId) {
      throw new AppError(
        'Usuário não tem permissão para invalidar refresh token',
        403,
      );
    }

    checkRefreshTokenExists.is_active = false;

    await refreshTokensRepository.save(checkRefreshTokenExists);
  }
}

export { InvalidateRefreshTokenService };
