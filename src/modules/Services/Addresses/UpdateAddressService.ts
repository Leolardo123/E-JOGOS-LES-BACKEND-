import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Address from '@modules/models/Address/Address';
import { IAddress } from './interfaces/IAddress';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import AddressType from '@modules/models/Address/AddressType';
import PlaceType from '@modules/models/Address/PlaceType';

interface IRequest {
    user_id: string;
    address_id: string;
    address: IAddress;
} 

interface IResponse {
    address: Address
}

@injectable()
class UpdateAddressService {
  public async execute({
    user_id,
    address_id,
    address:{
        address_type_id,
        place_type_id,
        cep,
        city,
        complement,
        country,
        neighborhood,
        number,
        place,
        state
    },
  }: IRequest): Promise<IResponse> {
    const addressesRepository = new GenericRepositoryProvider(Address);
    const addressesTypesRepository = new GenericRepositoryProvider(AddressType);
    const placesTypesRepository = new GenericRepositoryProvider(PlaceType);

    const addressExists = await addressesRepository.findOne({
        where:{
            id: address_id
        },
        relations:['person_address','person_address.person']
    })

    if(!addressExists){
        throw new AppError('Endereço não encontrado.')
    }

    if(!addressExists.person_address){
        throw new AppError('Endereço inválido.')
    } 
    
    if(addressExists.person_address){
        if(addressExists.person_address.person?.user_id!=user_id){
            throw new AppError('Endereço inválido.');
        }
    }
    
    if(cep) addressExists.cep = cep;
    if(place) addressExists.place = place;
    if(number) addressExists.number = number;
    if(city) addressExists.city = city;
    if(state) addressExists.state = state;
    if(country) addressExists.country = country;
    if(complement||complement=='') addressExists.complement = complement;
    if(neighborhood) addressExists.neighborhood = neighborhood;
    if(address_type_id){
        const addressTypeExists = await addressesTypesRepository.findOne({
            where:{
                id: address_type_id
            }
        })
        if(!addressTypeExists){
            throw new AppError(`Tipo de endereço escolhido não existe.`);
        }
    }
    if(place_type_id){
        const placeTypeExists = await placesTypesRepository.findOne({
            where:{
                id: place_type_id
            }
        })
        if(!placeTypeExists){
            throw new AppError(`Tipo de logradouro escolhido não existe.`);
        }
    }

    await addressesRepository.save(addressExists);

    return {
        address:addressExists
    }
  }
}

export default UpdateAddressService;
