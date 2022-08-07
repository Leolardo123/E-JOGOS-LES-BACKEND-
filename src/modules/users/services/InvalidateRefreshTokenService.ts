import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { RefreshToken } from '../models/RefreshToken';

interface IRequest {
  userId: string;
  accessToken: string;
}

@injectable()
class InvalidateRefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IDomainRepository<RefreshToken>,
  ) { }
  public async execute({ userId, accessToken }: IRequest): Promise<void> {
    const [, token] = accessToken.split(' ');

    const checkRefreshTokenExists = await this.refreshTokensRepository.findOne({
      where: {
        refresh_token: token
      }
    });

    if (checkRefreshTokenExists?.user_id !== userId) {
      throw new AppError(
        'Acesso negado.',
        403,
      );
    }

    checkRefreshTokenExists.is_active = false;

    await this.refreshTokensRepository.save(checkRefreshTokenExists);
  }
}

export { InvalidateRefreshTokenService };
