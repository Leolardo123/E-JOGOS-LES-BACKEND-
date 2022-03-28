import { injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import { refreshTokenConfig } from '@config/refreshToken';
import { auth } from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@modules/models/User/User';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import { RefreshToken } from '@modules/models/User/RefreshToken';

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@injectable()
class UpdateRefreshTokenService {
  public async execute(refreshToken: string): Promise<IResponse> {
    const refreshTokensRepository = new GenericRepositoryProvider(RefreshToken)
    const usersRepository = new GenericRepositoryProvider(User)

    const checkRefreshTokenExists = await refreshTokensRepository.findOne({
      where:{
        refresh_token:refreshToken
      }
    });

    if (!checkRefreshTokenExists||!checkRefreshTokenExists.is_active) {
      throw new AppError('Token Inválido', 401);
    }

    checkRefreshTokenExists.is_active = false;

    await refreshTokensRepository.save(checkRefreshTokenExists);

    const checkUserExists = await usersRepository.findOne({
      where:{
        id:checkRefreshTokenExists.user_id
      }
    });

    if (!checkUserExists) {
      throw new AppError('Usuário não encontrado no sistema!', 404);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: checkUserExists.id,
      expiresIn,
    });

    const newRefreshToken = refreshTokensRepository.create({
      access_token: token,
      refresh_token: crypto.randomBytes(32).toString('hex'),
      expires_in: refreshTokenConfig.refreshToken.expiresIn,
      is_active: true,
      user_id: checkUserExists.id,
    });

    await refreshTokensRepository.save(newRefreshToken);

    return {
      user: checkUserExists,
      access_token: token,
      refresh_token: newRefreshToken.refresh_token,
    };
  }
}

export { UpdateRefreshTokenService };
