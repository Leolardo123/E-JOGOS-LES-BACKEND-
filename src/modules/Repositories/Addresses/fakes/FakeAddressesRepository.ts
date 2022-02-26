import Address from "@modules/models/Address/Address";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreateAddressDTO from "../DTOS/ICreateAddressDTO";
import IAddressesRepository from "../interfaces/IAddressesRepository";


class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>> {
    const minValue = (page - 1) * limit;
    const maxValue = minValue + limit;


    const filteredAddresses = this.addresses.filter(
      address => address.id === '1',
    );
    const paginatedAddresses = filteredAddresses.slice(minValue, maxValue);

    return {
      results: paginatedAddresses,
      limit,
      page,
      total: filteredAddresses.length,
    };
  }

  public async findById(
    id: string,
  ): Promise<Address | undefined> {
    const address = this.addresses
      .find(findAddress => findAddress.id === id);

    return address;
  }

  public create( data : ICreateAddressDTO): Address {
    const address = new Address();

    Object.assign(address, data);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    this.addresses.push(address);

    return address;
  }

  public async remove(address: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    this.addresses.splice(addressIndex, 1);
  }
}

export default FakeAddressesRepository;
