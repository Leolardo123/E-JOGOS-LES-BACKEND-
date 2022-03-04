import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';

import IPlacesTypesRepository from '@modules/Repositories/Addresses/interfaces/IPlacesTypesRepository';
import PlaceType from '@modules/models/Address/PlaceType';


@injectable()
class IndexPlacesTypesService {
  constructor(

    @inject('PlacesTypesRepository')
    private placesTypesRepository: IPlacesTypesRepository,
  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
    return await this.placesTypesRepository.index({page,limit})
  }
}

export default IndexPlacesTypesService;
