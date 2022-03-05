import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import AddressesTypesRepository from '@modules/Repositories/Addresses/AddressesTypesRepository';
import AddressType from '@modules/models/Address/AddressType';


@injectable()
class IndexAddressesService {
  constructor(

    private addressesTypesRepository:AddressesTypesRepository,

  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
    this.addressesTypesRepository = getCustomRepository(AddressesTypesRepository)
    return await this.addressesTypesRepository.index({page,limit})
  }
}

export default IndexAddressesService;
