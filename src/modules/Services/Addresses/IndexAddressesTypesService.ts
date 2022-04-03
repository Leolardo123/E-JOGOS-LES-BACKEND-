import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import AddressType from '@modules/models/Address/AddressType';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';


@injectable()
class IndexAddressesService {
  public async execute({
    page = 1,
    limit = 10
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
    const repository = new GenericRepositoryProvider(AddressType);
    const results = await repository.index({
      limit,
      page,
    })
    return results;
  }
}

export default IndexAddressesService;
