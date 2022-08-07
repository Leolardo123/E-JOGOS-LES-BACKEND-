import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import PlaceType from '@modules/models/Address/PlaceType';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';


@injectable()
class IndexPlacesService {
  public async execute({
    page = 1,
    limit = 10
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
    const repository = new GenericRepositoryProvider(PlaceType);
    const results = await repository.index({
      limit,
      page,
    })
    return results;
  }
}

export default IndexPlacesService;
