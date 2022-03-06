import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import { auth } from '@config/auth';
import { refreshTokenConfig } from '@config/refreshToken';
import User from '@modules/models/User/User';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';
import { RefreshTokensRepository } from '@modules/Repositories/Users/RefreshTokensRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';


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

    private usersRepository : UsersRepository,

    private refreshTokensRepository : RefreshTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    this.usersRepository = getCustomRepository(UsersRepository)
    this.refreshTokensRepository = getCustomRepository(RefreshTokensRepository)

    const user = await this.usersRepository.findOne(email);

    if (!user) {
      throw new AppError('Combinação de email/senha incorreta!', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação de email/senha incorreta!', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign(
      {
          subject:user.id,
          expiresIn
      },
      secret
    );

    const refreshToken = this.refreshTokensRepository.create({
      id: this.idGeneratorProvider.generate(),
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
