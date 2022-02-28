import { inject, injectable } from 'tsyringe';

import User from '@modules/models/User/User';
import IAddressesTypesRepository from '@modules/Repositories/Addresses/interfaces/IAddressesTypesRepository';
import IPlacesTypesRepository from '@modules/Repositories/Addresses/interfaces/IPlacesTypesRepository';
import IUsersRepository from '@modules/Repositories/Users/interfaces/IUsersRepository';
import IAddressesRepository from '@modules/Repositories/Addresses/interfaces/IAddressesRepository';
import IPersonsRepository from '@modules/Repositories/Users/interfaces/IPersonsRepository';
import IPhonesRepository from '@modules/Repositories/Users/interfaces/IPhonesRepository';

import IHashProvider from '../../../shared/container/providers/HashProvider/models/IHashProvider';
import IIdGeneratorProvider from '../../../shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';

import moment from 'moment';

interface IUser{
    email: string,
    password: string,
}

interface IPhone {
    ddd: number,
    number: number
}

interface IPerson{
    name: string;
    cpf: string;
    cellphone: number;
    birth_date: string;
    gender_id: number;
    phone: IPhone;
}

interface IAddress{
    cep: string,
    place: string,
    number: number,
    city: string,
    state: string,
    country: string,
    complement?: string,
    neighborhood: string,
    address_type_id: number,
    place_type_id: number,
}

interface IRequest {
    user: IUser;
    person: IPerson;
    address: IAddress;
} 

interface IResponse {
    user: User
}

@injectable()
class CreateUserService {
  constructor(

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,

    @inject('AddresesRepository')
    private addresesRepository: IAddressesRepository,

    @inject('AddressesTypesRepository')
    private addressesTypesRepository: IAddressesTypesRepository,

    @inject('placesTypesRepository')
    private placesTypesRepository: IPlacesTypesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,

  ) {}

  public async execute({
    user,
    person,
    address
  }: IRequest): Promise<IResponse> {
    const transaction: ITransaction = { data: [] };

    const userExists = await this.usersRepository.findByEmail(user.email)

    if(userExists){
        throw new AppError('Email já está cadastrado.')
    } 

    const placeType = await this.placesTypesRepository.findById(address.place_type_id) 

    if(!placeType){
        throw new AppError('Tipo de logradouro não existe.')
    } 

    const addressType = await this.addressesTypesRepository.findById(address.address_type_id) 

    if(!addressType){
        throw new AppError('Tipo de endereço não existe.')
    } 

    if(
        moment(person.birth_date, "MM/DD/YYYY", true).isValid()
        && new Date() > new Date(person.birth_date)
    ){
        throw new AppError('Data de nascimento inválida.')
    }

    const createdAddress = this.addresesRepository.create({
        id: this.idGeneratorProvider.generate(),
        cep: address.cep,
        number: address.number,
        place: address.place,
        city: address.city,
        state: address.state,
        country: address.country,
        neighborhood: address.neighborhood,
        complement: address.complement,
        address_type_id: address.address_type_id,
        place_type_id: address.place_type_id,
    })

    const createdPerson = this.personsRepository.create({
        id: this.idGeneratorProvider.generate(),
        cpf: person.cpf,
        name: person.name,
        gender_id: person.gender_id,
        address_id: createdAddress.id,
        birth_date: new Date(person.birth_date),
        cellphone: person.cellphone,
    })

    const createdPhone = this.phonesRepository.create({
        id: this.idGeneratorProvider.generate(),
        ddd: person.phone.ddd,
        number: person.phone.number,
        person_id: createdPerson.id
    })
    const hashedPassword = await this.hashProvider.generateHash(user.password);

    const createdUser = this.usersRepository.create({
        id: this.idGeneratorProvider.generate(),
        email: user.email,
        password: hashedPassword,
        person_id: createdPerson.id,
    })

    transaction.data.push(
        {
            entity: createdAddress,
            repository: this.addresesRepository
        },
        {
            entity: createdPerson,
            repository: this.personsRepository
        },
        {
            entity: createdPhone,
            repository: this.phonesRepository
        },
        {
            entity: createdUser,
            repository: this.usersRepository
        }
    )

    createdPerson.address = createdAddress
    createdPerson.phone.push(createdPhone)

    createdUser.person = createdPerson

    this.repositoryUtils.transaction(transaction)

    return {
        user:createdUser
    }
  }
}

export default CreateUserService;
