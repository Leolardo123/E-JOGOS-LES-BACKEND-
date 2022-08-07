import { injectable } from 'tsyringe';
import User from '@modules/models/User/User';
import AppError from '../../../shared/errors/AppError';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';

interface IUserCustom{
    email:string
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
  public async execute({
    user_id,
    user:{
        email
    },
  }: IRequest): Promise<IResponse> {
    const usersRepository = new GenericRepositoryProvider(User);
    const userExists = await usersRepository.findOne({
      where:{
        id:user_id
      }
    })

    if(!userExists){
        throw new AppError('Usuário não encontrado.')
    }

    if(email){
        const emailExists = await usersRepository.findOne({
          where:{
            email
          }
        })
        if(emailExists){
            throw new AppError('Email escolhido já está cadastrado.')
        }
        userExists.email =  email
    }

    await usersRepository.save(userExists)

    return {
        user:userExists
    }
  }
}

export default UpdateUserService;
