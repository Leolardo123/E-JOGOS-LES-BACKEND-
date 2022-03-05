import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import Address from '@modules/models/Address/Address';
import AddressesRepository from '@modules/Repositories/Addresses/AddressesRepository';
import { getCustomRepository } from 'typeorm';


@injectable()
class IndexAddressesService {
  constructor(

    private addressesRepository:AddressesRepository,

  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>> {
    this.addressesRepository = getCustomRepository(AddressesRepository)
    return await this.addressesRepository.index({page,limit})
  }
}

export default IndexAddressesService;
