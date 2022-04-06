import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import { auth } from '@config/auth';
import { refreshTokenConfig } from '@config/refreshToken';
import User from '@modules/models/User/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { RefreshToken } from '@modules/models/User/RefreshToken';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import { request } from 'http';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = new GenericRepositoryProvider(User);
    const refreshTokensRepository = new GenericRepositoryProvider(RefreshToken);


    const user = await usersRepository.findOne({where: { email }});

    if (!user) {
      throw new AppError('Combinação de email/senha incorreta!', 404);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação de email/senha incorreta!', 404);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign(
      {
          subject:user.id,
          expiresIn
      },
      secret
    );

    const refreshToken = refreshTokensRepository.create({
      access_token: token,
      expires_in: refreshTokenConfig.refreshToken.expiresIn,
      is_active: true,
      refresh_token: crypto.randomBytes(32).toString('hex'),
      user_id: user.id,
    });

    await refreshTokensRepository.save(refreshToken);

    return {
      user,
      access_token: token,
      refresh_token: refreshToken.refresh_token,
    };
  }
}

export { AuthenticateUserService };
