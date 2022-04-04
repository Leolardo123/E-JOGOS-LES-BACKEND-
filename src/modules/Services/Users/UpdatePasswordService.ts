import { inject, injectable } from 'tsyringe';
import User from '@modules/models/User/User';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';

interface IUserCustom{
  new_password: string,
  old_password: string
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
    @inject('HashProvider')
    private hashProvider:IHashProvider,
  ) {}

  public async execute({
    user_id,
    user:{
        new_password,
        old_password
    },
  }: IRequest): Promise<IResponse> {
    const usersRepository = new GenericRepositoryProvider(User)
    const userExists = await usersRepository.findOne({
      where:{
        id: user_id
      }
    })

    if(!userExists){
        throw new AppError('Usuário não encontrado.')
    }

    const equals = await this.hashProvider.compareHash(userExists.password,old_password);

    if(!equals){
      throw new AppError('Senha antiga não confere.')
    }

    userExists.password = await this.hashProvider.generateHash(new_password)

    await usersRepository.save(userExists)

    return {
        user:userExists
    }
  }
}

export default UpdateUserService;
