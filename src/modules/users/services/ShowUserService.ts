import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import User from '../models/User';

interface IRequest {
  user_id: string;
}

interface IResponse {
  user: User
}

@injectable()
class ShowUserService {
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
      relations: ['person', 'person.phone', 'person.addresses']
    })

    if (!userExists) {
      throw new AppError('Usuário não encontrado.')
    }

    return {
      user: userExists
    }
  }
}

export default ShowUserService;
