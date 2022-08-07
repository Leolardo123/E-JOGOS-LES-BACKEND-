import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import User from '../models/User';

interface IUserCustom {
  email?: string,
  old_password?: string,
  new_password?: string
}

interface IRequest {
  user_id: string;
  user: IUserCustom;
}

interface IResponse {
  user: User
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IDomainRepository<User>,
  ) { }
  public async execute({
    user_id,
    user: {
      email,
      old_password,
      new_password
    },
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findOne({
      where: {
        id: user_id
      }
    })

    if (!userExists) {
      throw new AppError('Usuário não encontrado.')
    }

    if (email) {
      const emailExists = await this.usersRepository.findOne({
        where: {
          email
        }
      })
      if (emailExists) {
        throw new AppError('Email escolhido já está cadastrado.')
      }
      userExists.email = email
    }

    await this.usersRepository.save(userExists)

    return {
      user: userExists
    }
  }
}

export default UpdateUserService;
