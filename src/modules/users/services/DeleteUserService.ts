import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import User from '../models/User';

interface IRequest {
  user_id: string;
}

interface IResponse {
  user: User
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IDomainRepository<User>,
  ) { }
  public async execute({
    user_id,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findOne({
      where: {
        id: user_id
      },
      relations: ['person', 'person.phone', 'person.address']
    })

    if (!userExists) {
      throw new AppError('Usuário não encontrado.')
    }

    this.usersRepository.remove(userExists)

    return {
      user: userExists
    }
  }
}

export default DeleteUserService;
