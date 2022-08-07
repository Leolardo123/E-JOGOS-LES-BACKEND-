import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import { auth } from '@config/auth';
import { refreshTokenConfig } from '@config/refreshToken';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import User from '../models/User';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import { RefreshToken } from '../models/RefreshToken';

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
    @inject('Repository')
    private usersRepository: IDomainRepository<User>,

    @inject('Repository')
    private refreshTokensRepository: IDomainRepository<RefreshToken>,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOne({ where: { email } });

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
        subject: user.id,
        expiresIn
      },
      secret
    );

    const refreshToken = this.refreshTokensRepository.create({
      access_token: token,
      expires_in: refreshTokenConfig.refreshToken.expiresIn,
      is_active: true,
      refresh_token: crypto.randomBytes(32).toString('hex'),
      user_id: user.id,
    });

    await this.refreshTokensRepository.save(refreshToken);

    return {
      user,
      access_token: token,
      refresh_token: refreshToken.refresh_token,
    };
  }
}

export { AuthenticateUserService };
