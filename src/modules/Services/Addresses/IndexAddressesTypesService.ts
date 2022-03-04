import IAddressesTypesRepository from '@modules/Repositories/Addresses/interfaces/IAddressesTypesRepository';
import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import AddressType from '@modules/models/Address/AddressType';


@injectable()
class IndexAddressesTypesService {
  constructor(

    @inject('AddressesTypesRepository')
    private addressesTypesRepository: IAddressesTypesRepository,
  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
    return await this.addressesTypesRepository.index({page,limit})
  }
}

export default IndexAddressesTypesService;
