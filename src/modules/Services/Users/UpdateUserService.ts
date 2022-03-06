import { injectable } from 'tsyringe';
import User from '@modules/models/User/User';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';

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
  constructor(
    private usersRepository:UsersRepository,
  ) {}

  public async execute({
    user_id,
    user:{
        email
    },
  }: IRequest): Promise<IResponse> {
    this.usersRepository = getCustomRepository(UsersRepository)

    const userExists = await this.usersRepository.findOne({where:{id:user_id}})

    if(!userExists){
        throw new AppError('Usuário não encontrado.')
    }

    if(email){
        const emailExists = await this.usersRepository.findOne({where:{email}})
        if(emailExists){
            throw new AppError('Email escolhido já está cadastrado.')
        }
        userExists.email =  email
    }

    this.usersRepository.save(userExists)

    return {
        user:userExists
    }
  }
}

export default UpdateUserService;
