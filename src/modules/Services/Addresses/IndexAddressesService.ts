import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { injectable } from 'tsyringe';
import Address from '@modules/models/Address/Address';
import GenericRepositoryProvider from '@modules/Repositories/Generic/implementations/GenericRepositoryProvider';
import { DeepPartial } from 'typeorm';

interface IRequest {
  whereParams?: DeepPartial<Address>,
  page?: number,
  limit?: number,
}

@injectable()
class IndexAddressesService {
  public async execute({
    page = 1,
    limit = 10,
    whereParams
  }: IRequest): Promise<IPaginatedResponse<Address>> {
    const addressesRepository = new GenericRepositoryProvider(Address);
    return await addressesRepository.index({
      page,
      limit,
      findParams: {
        where: whereParams
      }
    })
  }
}

export default IndexAddressesService;
