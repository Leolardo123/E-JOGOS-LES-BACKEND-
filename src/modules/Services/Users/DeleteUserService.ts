import { injectable } from 'tsyringe';
import User from '@modules/models/User/User';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';

interface IRequest {
    user_id: string;
} 

interface IResponse {
    user: User
}

@injectable()
class DeleteUserService {
  public async execute({
    user_id,
  }: IRequest): Promise<IResponse> {
    const usersRepository = new GenericRepositoryProvider(User);
    const userExists = await usersRepository.findOne({
      where:{
        id:user_id
      },
      relations:['person','person.phone','person.address']
    })

    if(!userExists){
        throw new AppError('Usuário não encontrado.')
    }

    usersRepository.remove(userExists)

    return {
        user:userExists
    }
  }
}

export default DeleteUserService;
