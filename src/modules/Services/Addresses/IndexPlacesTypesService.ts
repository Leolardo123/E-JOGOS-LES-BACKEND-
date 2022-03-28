import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import PlacesTypesRepository from '@modules/Repositories/Addresses/AddressesPlacesTypesRepository';
import PlaceType from '@modules/models/Address/PlaceType';


@injectable()
class IndexPlacesService {
  constructor(
    @inject('PlacesTypesRepository')
    private placesTypesRepository:PlacesTypesRepository,
  ) {}

  public async execute({
    page = 1,
    limit = 10
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
    const [ results, total ] = await this.placesTypesRepository.findAndCount({
      skip: (page-1) * limit,
      take: limit
    })
    return { results, total, page, limit }
  }
}

export default IndexPlacesService;
