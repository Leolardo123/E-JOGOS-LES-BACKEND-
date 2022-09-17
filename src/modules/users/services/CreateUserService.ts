import { inject, injectable } from 'tsyringe';


import IRepositoryUtils, { ITransaction } from '../../../shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import AppError from '../../../shared/errors/AppError';

import moment from 'moment';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IUser } from './interfaces/IUser';
import { IPerson } from './interfaces/IPerson';
import Address from '@modules/addresses/models/Address';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import { IAddress } from '@modules/addresses/services/interfaces/IAddress';
import User from '../models/User';
import Person from '../models/Person';
import Phone from '../models/Phone';
import PersonAddress from '@modules/addresses/models/PersonAddress';
import AddressType from '@modules/addresses/models/AddressType';
import PlaceType from '@modules/addresses/models/PlaceType';
import Gender from '../models/Gender';

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
        @inject('AddressesRepository')
        private addressesRepository: IDomainRepository<Address>,

        @inject('UsersRepository')
        private usersRepository: IDomainRepository<User>,

        @inject('PersonsRepository')
        private personsRepository: IDomainRepository<Person>,

        @inject('PhonesRepository')
        private phonesRepository: IDomainRepository<Phone>,

        @inject('PersonAddressesRepository')
        private personAddressesRepository: IDomainRepository<PersonAddress>,

        @inject('AddressesTypesRepository')
        private addressesTypesRepository: IDomainRepository<AddressType>,

        @inject('PlacesTypesRepository')
        private placesTypesRepository: IDomainRepository<PlaceType>,

        @inject('GendersRepository')
        private gendersRepository: IDomainRepository<Gender>,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('RepositoryUtils')
        private repositoryUtils: IRepositoryUtils,
    ) { }
    public async execute({
        user,
        person,
        address
    }: IRequest): Promise<IResponse> {


        const transaction: ITransaction = { data: [] };

        const userExists = await this.usersRepository.findOne({
            where: {
                email: user.email
            }
        })

        if (userExists) {
            throw new AppError('Email já está cadastrado.')
        }

        const placeType = await this.placesTypesRepository.findOne({
            where: {
                id: address.place_type_id
            }
        })

        if (!placeType) {
            throw new AppError('Tipo de logradouro não existe.')
        }

        const addressType = await this.addressesTypesRepository.findOne({
            where: {
                id: address.address_type_id
            }
        })

        if (!addressType) {
            throw new AppError('Tipo de endereço não existe.')
        }

        const gender = await this.gendersRepository.findOne({
            where: {
                id: person.gender_id
            }
        });

        if (!gender) {
            throw new AppError('Genero selecionado não é uma opção válida.');
        }

        const parseBirthDate = moment(person.birth_date, "DD/MM/YYYY").toDate();
        const hashedPassword = await this.hashProvider.generateHash(user.password);

        const createdUser = this.usersRepository.create({
            email: user.email,
            password: hashedPassword,
        })

        const createdPerson = this.personsRepository.create({
            user_id: createdUser.id,
            birth_date: parseBirthDate,
            cellphone: person.cellphone,
            cpf: person.cpf,
            name: person.name,
            gender_id: person.gender_id,
        })

        const createdAddress = this.addressesRepository.create({
            ...address
        })

        const createdPersonAddress = this.personAddressesRepository.create({
            person_id: createdPerson.id,
            address_id: createdAddress.id
        })

        const createdPhone = this.phonesRepository.create({
            number: person.phone.number,
            ddd: person.phone.ddd,
            person_id: createdPerson.id
        })

        transaction.data.push(
            {
                entity: createdUser,
                repository: this.usersRepository
            },
            {
                entity: createdPerson,
                repository: this.personsRepository
            },
            {
                entity: createdAddress,
                repository: this.addressesRepository
            },
            {
                entity: createdPersonAddress,
                repository: this.personAddressesRepository
            },
            {
                entity: createdPhone,
                repository: this.phonesRepository
            },
        )

        createdPerson.addresses = []

        createdPerson.addresses.push(createdPersonAddress);

        createdPerson.phone = createdPhone;

        createdUser.person = createdPerson;

        await this.repositoryUtils.transaction(transaction);

        return {
            user: createdUser
        }
    }
}

export default CreateUserService;
