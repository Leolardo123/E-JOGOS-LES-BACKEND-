import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import IPaginatedRequest from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import IAddressesRepository from '@modules/Repositories/Addresses/interfaces/IAddressesRepository';
import Address from '@modules/models/Address/Address';


@injectable()
class IndexAddressesService {
  constructor(

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    page,
    limit
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>> {
    return await this.addressesRepository.index({page,limit})
  }
}

export default IndexAddressesService;
