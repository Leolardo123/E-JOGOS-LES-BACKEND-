import { injectable } from 'tsyringe';

import User from '@modules/models/User/User';
import { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';
import moment from 'moment';

interface IUser{
    email: string,
}

interface IPhone {
    ddd: number,
    number: number
}

interface IPerson{
    name?: string;
    cpf?: string;
    cellphone?: number;
    birth_date?: string;
    gender_id?: number;
    phone?: IPhone;
}

interface IAddress{
    cep?: string,
    place?: string,
    number?: number,
    city?: string,
    state?: string,
    country?: string,
    complement?: string,
    neighborhood?: string,
    address_type_id?: number,
    place_type_id?: number,
}

interface IRequest {
    user_id: string;
    user?: IUser;
    person?: IPerson;
    address?: IAddress;
} 

interface IResponse {
    user: User
}

@injectable()
class UpdateUserService {
  constructor(
    private usersRepository:UsersRepository
  ) {}

  public async execute({
    user_id,
    user,
    person,
    address
  }: IRequest): Promise<IResponse> {
    const transaction: ITransaction = { data: [] };

    this.usersRepository = getCustomRepository(UsersRepository)

    const userExists = await this.usersRepository.findOne({relations:[
        'person','person.addresses','person.phone'
    ],where:{id:user_id}})

    if(!userExists){
        throw new AppError('Email já está cadastrado.')
    }

    if(user){
        if(user.email){
            const emailExists = await this.usersRepository.findOne(user.email)
            if(!emailExists){
                throw new AppError('Email escolhido já está cadastrado.')
            }
            userExists.email =  user.email
        }
    }

    if(person){
        if(person.birth_date){
            if(
                moment(person.birth_date, "MM/DD/YYYY", true).isValid()
                && new Date() > new Date(person.birth_date)
            ){
                throw new AppError('Data de nascimento inválida.')
            }
            userExists.person.birth_date = new Date(person.birth_date)
        } 
        if(person.cellphone) userExists.person.cellphone = person.cellphone
        if(person.cpf) userExists.person.cpf = person.cpf
        if(person.gender_id) userExists.person.gender_id = person.gender_id
        if(person.name) userExists.person.name = person.name
        if(person.phone){
            userExists.person.phone = {
                id:userExists.person.phone.id,
                person_id:userExists.person.id,
                person:userExists.person,
                ...person.phone
            }
        }
    }

    if(address){
        person
    }

    this.usersRepository.save(userExists)

    return {
        user:userExists
    }
  }
}

export default UpdateUserService;
