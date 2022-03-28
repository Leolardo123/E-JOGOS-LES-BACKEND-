import { inject, injectable } from 'tsyringe';

import User from '@modules/models/User/User';

import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';

import moment from 'moment';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IUser } from './interfaces/IUser';
import { IPerson } from './interfaces/IPerson';
import { IAddress } from '../Addresses/interfaces/IAddress';
import Address from '@modules/models/Address/Address';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import AddressType from '@modules/models/Address/AddressType';
import PlaceType from '@modules/models/Address/PlaceType';
import Gender from '@modules/models/User/Gender';
import Person from '@modules/models/User/Person';
import PersonAddress from '@modules/models/Address/PersonAddress';
import Phone from '@modules/models/User/Phone';

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
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}
  public async execute({
    user,
    person,
    address
  }: IRequest): Promise<IResponse> {
    const usersRepository = new GenericRepositoryProvider(User)
    const personsRepository = new GenericRepositoryProvider(Person)
    const phonesRepository = new GenericRepositoryProvider(Phone)
    const addressesRepository = new GenericRepositoryProvider(Address)
    const personsAddressesRepository = new GenericRepositoryProvider(PersonAddress)
    const addressesTypesRepository = new GenericRepositoryProvider(AddressType)
    const placesTypesRepository = new GenericRepositoryProvider(PlaceType)
    const gendersRepository = new GenericRepositoryProvider(Gender)

    const transaction: ITransaction = { data: [] };

    const userExists = await usersRepository.findOne({
        where:{
            email: user.email
        }
    })

    if(userExists){
        throw new AppError('Email já está cadastrado.')
    } 

    const placeType = await placesTypesRepository.findOne({
        where:{
            id:address.place_type_id
        }
    }) 

    if(!placeType){
        throw new AppError('Tipo de logradouro não existe.')
    } 

    const addressType = await addressesTypesRepository.findOne({
        where:{
            id:address.address_type_id
        }
    }) 

    if(!addressType){
        throw new AppError('Tipo de endereço não existe.')
    } 

    const gender = await gendersRepository.findOne({
        where:{
            id:person.gender_id
        }
    });

    if(!gender){
        throw new AppError('Genero selecionado não é uma opção válida.');
    }

    const parseBirthDate = moment(person.birth_date, "DD/MM/YYYY").toDate();
    const hashedPassword = await this.hashProvider.generateHash(user.password);

    const createdUser = usersRepository.create({
        email: user.email,
        password: hashedPassword,
    })

    const createdPerson = personsRepository.create({
        user_id: createdUser.id,
        birth_date: parseBirthDate,
        cellphone: person.cellphone,
        cpf: person.cpf,
        name: person.name,
        gender_id: person.gender_id,
    })

    const createdAddress = addressesRepository.create({
        ...address
    })

    const createdPersonAddress = personsAddressesRepository.create({
        person_id: createdPerson.id,
        address_id: createdAddress.id
    })

    const createdPhone = phonesRepository.create({
        number: person.phone.number,
        ddd: person.phone.ddd,
        person_id: createdPerson.id
    })

    transaction.data.push(
        {
            entity: createdUser,
            repository: usersRepository
        },
        {
            entity: createdPerson,
            repository: personsRepository
        },
        {
            entity: createdAddress,
            repository: addressesRepository
        },
        {
            entity: createdPersonAddress,
            repository: personsAddressesRepository
        },
        {
            entity: createdPhone,
            repository: phonesRepository
        },
    )

    createdPerson.addresses = []
    
    createdPerson.addresses.push(createdPersonAddress);

    createdPerson.phone = createdPhone;

    createdUser.person = createdPerson;

    await this.repositoryUtils.transaction(transaction);

    return {
        user:createdUser
    }
  }
}

export default CreateUserService;
