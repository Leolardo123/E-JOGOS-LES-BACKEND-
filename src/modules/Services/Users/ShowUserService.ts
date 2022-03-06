import { injectable } from 'tsyringe';
import User from '@modules/models/User/User';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';

interface IRequest {
    user_id: string;
} 

interface IResponse {
    user: User
}

@injectable()
class ShowUserService {
  constructor(
    private usersRepository:UsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<IResponse> {
    this.usersRepository = getCustomRepository(UsersRepository)

    const userExists = await this.usersRepository.findOne({
      where:{
        id:user_id
      },
      relations:['person','person.phone','person.address']
    })

    if(!userExists){
        throw new AppError('Usuário não encontrado.')
    }

    return {
        user:userExists
    }
  }
}

export default ShowUserService;
