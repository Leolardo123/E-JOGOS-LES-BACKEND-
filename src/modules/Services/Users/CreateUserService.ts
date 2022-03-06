import { inject, injectable } from 'tsyringe';

import User from '@modules/models/User/User';

import IIdGeneratorProvider from '../../../shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';

import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '@modules/Repositories/Users/UsersRepository';
import PlacesTypesRepository from '@modules/Repositories/Addresses/AddressesPlacesTypesRepository';
import AddressesTypesRepository from '@modules/Repositories/Addresses/AddressesTypesRepository';
import AddressesRepository from '@modules/Repositories/Addresses/AddressesRepository';
import PhonesRepository from '@modules/Repositories/Users/PhonesRepository';
import PersonsRepository from '@modules/Repositories/Users/PersonsRepository';
import GendersRepository from '@modules/Repositories/Users/GenderRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IUser } from './interfaces/IUser';
import { IPerson } from './interfaces/IPerson';
import { IAddress } from './interfaces/IAddress';

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

    private usersRepository:UsersRepository,

    private gendersRepository:GendersRepository,

    private personsRepository:PersonsRepository,

    private phonesRepository:PhonesRepository,

    private addressesRepository:AddressesRepository,

    private placesTypesRepository:PlacesTypesRepository,

    private addressesTypesRepository:AddressesTypesRepository,

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

    this.usersRepository = getCustomRepository(UsersRepository)
    this.gendersRepository = getCustomRepository(GendersRepository)
    this.personsRepository = getCustomRepository(PersonsRepository)
    this.phonesRepository  = getCustomRepository(PhonesRepository)
    this.addressesRepository = getCustomRepository(AddressesRepository)
    this.placesTypesRepository = getCustomRepository(PlacesTypesRepository)
    this.addressesTypesRepository = getCustomRepository(AddressesTypesRepository)

    const userExists = await this.usersRepository.findOne({email:user.email})

    if(userExists){
        throw new AppError('Email já está cadastrado.')
    } 

    const placeType = await this.placesTypesRepository.findOne({id:address.place_type_id}) 

    if(!placeType){
        throw new AppError('Tipo de logradouro não existe.')
    } 

    const addressType = await this.addressesTypesRepository.findOne({id:address.address_type_id}) 

    if(!addressType){
        throw new AppError('Tipo de endereço não existe.')
    } 

    const gender = await this.gendersRepository.findOne({id:person.gender_id}) 

    if(!gender){
        throw new AppError('Genero selecionado não é uma opção válida.')
    }

    if(
        (!moment(person.birth_date, "DD/MM/YYYY", true).isValid())
        || new Date() > new Date(person.birth_date)
    ){
        throw new AppError('Data de nascimento inválida.')
    }

    const parseBirthDate = moment(person.birth_date, "DD/MM/YYYY").toDate()

    const createdAddress = this.addressesRepository.create({
        id: this.idGeneratorProvider.generate(),
        cep: address.cep,
        number: address.number,
        place: address.place,
        city: address.city,
        state: address.state,
        country: address.country,
        neighborhood: address.neighborhood,
        complement: address.complement || "",
        address_type_id: address.address_type_id,
        place_type_id: address.place_type_id,
    })

    const createdPerson = this.personsRepository.create({
        id: this.idGeneratorProvider.generate(),
        cpf: person.cpf,
        name: person.name,
        gender_id: person.gender_id,
        address_id: createdAddress.id,
        birth_date: parseBirthDate,
        cellphone: person.cellphone,
    })

    const createdPhone = this.phonesRepository.create({
        id: this.idGeneratorProvider.generate(),
        number: person.phone.number,
        ddd: person.phone.ddd,
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
            repository: this.addressesRepository
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

    createdPerson.phone = createdPhone

    createdUser.person = createdPerson

    this.repositoryUtils.transaction(transaction)

    return {
        user:createdUser
    }
  }
}

export default CreateUserService;
