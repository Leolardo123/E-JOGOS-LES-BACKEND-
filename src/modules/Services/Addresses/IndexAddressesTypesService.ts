import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import AddressesTypesRepository from '@modules/Repositories/Addresses/AddressesTypesRepository';
import AddressType from '@modules/models/Address/AddressType';


@injectable()
class IndexAddressesService {
  constructor(
    @inject('AddressesTypesRepository')
    private addressesTypesRepository:AddressesTypesRepository,
  ) {}

  public async execute({
    page = 1,
    limit = 10
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
    const [ results, total ] = await this.addressesTypesRepository.findAndCount({
      skip: (page-1) * limit,
      take: limit
    })
    return { results, total, page, limit }
  }
}

export default IndexAddressesService;
