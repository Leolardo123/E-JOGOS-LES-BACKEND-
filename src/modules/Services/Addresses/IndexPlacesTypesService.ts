import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import PlacesTypesRepository from '@modules/Repositories/Addresses/AddressesPlacesTypesRepository';
import PlaceType from '@modules/models/Address/PlaceType';


@injectable()
class IndexPlacesService {
  constructor(

    private placesTypesRepository:PlacesTypesRepository,

  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
    this.placesTypesRepository = getCustomRepository(PlacesTypesRepository)
    return await this.placesTypesRepository.index({page,limit})
  }
}

export default IndexPlacesService;
