import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import { refreshTokenConfig } from '@config/refreshToken';
import { auth } from '@config/auth';
import AppError from '@shared/errors/AppError';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import { RefreshTokensRepository } from '@modules/Repositories/Users/RefreshTokensRepository';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '@modules/models/User/User';

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@injectable()
class UpdateRefreshTokenService {
  constructor(

    private refreshTokensRepository: RefreshTokensRepository,

    private usersRepository: UsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

  ) {}

  public async execute(refreshToken: string): Promise<IResponse> {
    this.refreshTokensRepository = getCustomRepository(RefreshTokensRepository)
    this.usersRepository = getCustomRepository(UsersRepository)

    const checkRefreshTokenExists = await this.refreshTokensRepository.findOne(
      {where:{refresh_token:refreshToken}}
    );

    if (!checkRefreshTokenExists||!checkRefreshTokenExists.is_active) {
      throw new AppError('Token Inválido', 401);
    }

    checkRefreshTokenExists.is_active = false;

    await this.refreshTokensRepository.save(checkRefreshTokenExists);

    const checkUserExists = await this.usersRepository.findOne(
      {where:{id:checkRefreshTokenExists.user_id}},
    );

    if (!checkUserExists) {
      throw new AppError('Usuário não encontrado no sistema!', 404);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: checkUserExists.id,
      expiresIn,
    });

    const newRefreshToken = this.refreshTokensRepository.create({
      id: this.idGeneratorProvider.generate(),
      access_token: token,
      refresh_token: crypto.randomBytes(32).toString('hex'),
      expires_in: refreshTokenConfig.refreshToken.expiresIn,
      is_active: true,
      user_id: checkUserExists.id,
    });

    await this.refreshTokensRepository.save(newRefreshToken);

    return {
      user: checkUserExists,
      access_token: token,
      refresh_token: newRefreshToken.refresh_token,
    };
  }
}

export { UpdateRefreshTokenService };
