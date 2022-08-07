import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import Address from '@modules/addresses/models/Address';
import { IAddress } from './interfaces/IAddress';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import PersonAddress from '../models/PersonAddress';
import AddressType from '../models/AddressType';
import PlaceType from '../models/PlaceType';
import Person from '@modules/users/models/Person';

interface IRequest {
  addresses: IAddress[];
  user_id: string;
}

@injectable()
class AddPersonAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IDomainRepository<Address>,

    @inject('AddressesTypesRepository')
    private addressesTypesRepository: IDomainRepository<AddressType>,

    @inject('PlacesTypesRepository')
    private placesTypesRepository: IDomainRepository<PlaceType>,

    @inject('PersonsRepository')
    private personsRepository: IDomainRepository<Person>,

    @inject('PersonsAddressesRepository')
    private personsAddressesRepository: IDomainRepository<PersonAddress>,

    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) { }

  public async execute({
    addresses,
    user_id
  }: IRequest): Promise<PersonAddress[] | undefined> {
    const transaction: ITransaction = { data: [] };

    const personExists = await this.personsRepository.findOne({
      where: { user_id: user_id },
    })

    if (!personExists) {
      throw new AppError('Pessoa não encontrada');
    }

    let createdAddresses = [];
    for (let address of addresses) {
      if (address.address_type_id) {
        const addressTypeExists = await this.addressesTypesRepository.findOne({
          where: { id: address.address_type_id }
        });
        if (!addressTypeExists) {
          throw new AppError(`Tipo de endereço escolhido não existe.`);
        }
      }
      if (address.place_type_id) {
        const placeTypeExists = await this.placesTypesRepository.findOne({
          where: { id: address.place_type_id }
        });
        if (!placeTypeExists) {
          throw new AppError(`Tipo de logradouro escolhido não existe.`);
        }
      }

      const createdAddress = this.addressesRepository.create({
        ...address
      })

      const createdPersonAddress = this.personsAddressesRepository.create({
        address_id: createdAddress.id,
        person_id: personExists.id
      })

      transaction.data.push(
        {
          entity: createdAddress,
          repository: this.addressesRepository
        },
        {
          entity: createdPersonAddress,
          repository: this.personsAddressesRepository
        }
      )

      createdPersonAddress.address = createdAddress;
      createdAddresses.push(createdPersonAddress);
    }

    await this.repositoryUtils.transaction(transaction);

    return createdAddresses;
  }
}

export default AddPersonAddressesService;
