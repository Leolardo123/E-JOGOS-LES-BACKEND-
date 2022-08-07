import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Address from '@modules/addresses/models/Address';
import { IAddress } from './interfaces/IAddress';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';
import AddressType from '../models/AddressType';
import PlaceType from '../models/PlaceType';

interface IRequest {
    id: string,
    user_id: string;
    address: IAddress;
}

interface IResponse {
    address: Address
}

@injectable()
class UpdateAddressService {
    constructor(
        @inject('Repository')
        private addressesRepository: IDomainRepository<Address>,

        @inject('Repository')
        private addressesTypesRepository: IDomainRepository<AddressType>,

        @inject('Repository')
        private placesTypesRepository: IDomainRepository<PlaceType>,
    ) { }
    public async execute({
        user_id,
        id,
        address: {
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
        const addressExists = await this.addressesRepository.findOne({
            where: {
                id: id
            },
            relations: ['person_address', 'person_address.person']
        })

        if (!addressExists) {
            throw new AppError('Endereço não encontrado.')
        }

        if (!addressExists.person_address) {
            throw new AppError('Endereço inválido.')
        }

        if (addressExists.person_address) {
            if (addressExists.person_address.person?.user_id != user_id) {
                throw new AppError('Endereço inválido.');
            }
        }

        if (cep) addressExists.cep = cep;
        if (place) addressExists.place = place;
        if (number) addressExists.number = number;
        if (city) addressExists.city = city;
        if (state) addressExists.state = state;
        if (country) addressExists.country = country;
        if (complement || complement == '') addressExists.complement = complement;
        if (neighborhood) addressExists.neighborhood = neighborhood;
        if (address_type_id) {
            const addressTypeExists = await this.addressesTypesRepository.findOne({
                where: {
                    id: address_type_id
                }
            })
            if (!addressTypeExists) {
                throw new AppError(`Tipo de endereço escolhido não existe.`);
            }
        }
        if (place_type_id) {
            const placeTypeExists = await this.placesTypesRepository.findOne({
                where: {
                    id: place_type_id
                }
            })
            if (!placeTypeExists) {
                throw new AppError(`Tipo de logradouro escolhido não existe.`);
            }
        }

        await this.addressesRepository.save(addressExists);

        return {
            address: addressExists
        }
    }
}

export default UpdateAddressService;
