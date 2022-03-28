import { inject, injectable } from 'tsyringe';

import PersonAddress from '@modules/models/Address/PersonAddress';

import AppError from '@shared/errors/AppError';
import IRepositoryUtils, { ITransaction } from '@shared/container/providers/RepositoryUtilsProvider/models/IRepositoryUtils';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import Address from '@modules/models/Address/Address';
import AddressType from '@modules/models/Address/AddressType';
import PlaceType from '@modules/models/Address/PlaceType';
import Person from '@modules/models/User/Person';

interface IAddress {
  cep: string;
  number: number;
  address_type_id: number;
  place_type_id: number;
  city: string; 
  state: string;
  country: string;
  complement?: string;
  neighborhood: string;
  place: string;
}

interface IRequest {
  addresses: IAddress[];
  user_id: string;
}

@injectable()
class AddPersonAddressesService {
  constructor(
    @inject('RepositoryUtils')
    private repositoryUtils: IRepositoryUtils,
  ) {}

  public async execute({
    addresses,
    user_id
  }: IRequest): Promise<PersonAddress[] | undefined> {
    const addressesRepository = new GenericRepositoryProvider(Address);
    const personsAddressesRepository = new GenericRepositoryProvider(PersonAddress);
    const addressesTypesRepository = new GenericRepositoryProvider(AddressType);
    const placesTypesRepository = new GenericRepositoryProvider(PlaceType);
    const personsRepository = new GenericRepositoryProvider(Person);

    const transaction : ITransaction = { data: [] };

    const personExists = await personsRepository.findOne({
      where:{user_id},
    })
    
    if(!personExists){
      throw new AppError('Pessoa não encontrada');
    }

    let createdAddresses = [];
    for(let address of addresses){
      if(address.address_type_id){
          const addressTypeExists = await addressesTypesRepository.findOne({
            where:{ id: address.address_type_id }
          });
          if(!addressTypeExists){
              throw new AppError(`Tipo de endereço escolhido não existe.`);
          }
      }
      if(address.place_type_id){
          const placeTypeExists = await placesTypesRepository.findOne({
            where:{ id: address.place_type_id }
          });
          if(!placeTypeExists){
              throw new AppError(`Tipo de logradouro escolhido não existe.`);
          }
      }

      const createdAddress = addressesRepository.create({
        ...address
      })
      
      const createdPersonAddress = personsAddressesRepository.create({
        address_id: createdAddress.id,
        person_id: personExists.id
      })

      transaction.data.push(
        {
          entity:createdAddress,
          repository:addressesRepository
        },
        {
          entity: createdPersonAddress,
          repository: personsAddressesRepository
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
