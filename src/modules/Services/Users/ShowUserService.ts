import { inject, injectable } from 'tsyringe';
import User from '@modules/models/User/User';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';
import { IGenericRepositoryProvider } from '@shared/container/providers/GenericRepositoryProvider/models/IGenericRepositoryProvider';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';

interface IRequest {
    user_id: string;
} 

interface IResponse {
    user: User
}

@injectable()
class ShowUserService {
  public async execute({
    user_id,
  }: IRequest): Promise<IResponse> {
    const usersRepository = new GenericRepositoryProvider(User)
    const userExists = await usersRepository.findOne({
      where:{
        id:user_id
      },
      relations:['person','person.phone','person.addresses']
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
