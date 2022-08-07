import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import Address from '@modules/addresses/models/Address';
import { DeepPartial } from 'typeorm';
import { IDomainRepository } from '@modules/domain/repositories/interfaces/IDomainRepository';

interface IRequest {
  whereParams?: DeepPartial<Address>,
  page?: number,
  limit?: number,
}

@injectable()
class IndexAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IDomainRepository<Address>,
  ) { }
  public async execute({
    page = 1,
    limit = 10,
    whereParams
  }: IRequest): Promise<IPaginatedResponse<Address>> {
    return await this.addressesRepository.index({
      page,
      limit,
      findParams: {
        where: whereParams
      }
    })
  }
}

export default IndexAddressesService;
