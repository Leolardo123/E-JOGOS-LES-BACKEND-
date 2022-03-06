import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AddressesRepository from '@modules/Repositories/Addresses/AddressesRepository';
import { IAddress } from '../Users/interfaces/IAddress';
import Address from '@modules/models/Address/Address';
import PlacesTypesRepository from '@modules/Repositories/Addresses/AddressesPlacesTypesRepository';
import AddressesTypesRepository from '@modules/Repositories/Addresses/AddressesTypesRepository';

interface IRequest {
    address_id: string;
    address: IAddress;
} 

interface IResponse {
    address: Address
}

@injectable()
class UpdateAddressService {
  constructor(
    private addressesRepository:AddressesRepository,
    private addressesTypesRepository:AddressesTypesRepository,
    private placesTypesRepository:PlacesTypesRepository,
  ) {}

  public async execute({
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
    this.addressesRepository = getCustomRepository(AddressesRepository)
    this.addressesTypesRepository = getCustomRepository(AddressesTypesRepository)
    this.placesTypesRepository = getCustomRepository(PlacesTypesRepository)

    const addressExists = await this.addressesRepository.findOne({where:{id:address_id}})

    if(!addressExists){
        throw new AppError('Endereço não encontrado.')
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
        const addressTypeExists = await this.addressesTypesRepository.findOne({where:{id:address_type_id}});
        if(!addressTypeExists){
            throw new AppError(`Tipo de endereço escolhido não existe.`);
        }
    }
    if(place_type_id){
        const placeTypeExists = await this.placesTypesRepository.findOne({where:{id:place_type_id}});
        if(!placeTypeExists){
            throw new AppError(`Tipo de logradouro escolhido não existe.`);
        }
    }

    this.addressesRepository.save(addressExists);

    return {
        address:addressExists
    }
  }
}

export default UpdateAddressService;
