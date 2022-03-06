import AddressType from "@modules/models/Address/AddressType";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreateAddressTypeDTO from "../DTOS/ICreateAddressTypeDTO";
import IAddressesTypesRepository from "../interfaces/IAddressesTypesRepository";

class FakeAddressesTypesRepository implements IAddressesTypesRepository {
  private addresses: AddressType[] = [];

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
    const minValue = (page - 1) * limit;
    const maxValue = minValue + limit;


    const filteredAddresses = this.addresses.filter(
      address => address.id === 1,
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
    id: number,
  ): Promise<AddressType | undefined> {
    const address = this.addresses
      .find(findAddress => findAddress.id === id);

    return address;
  }

  public create( data : ICreateAddressTypeDTO): AddressType {
    const address = new AddressType();

    Object.assign(address, data);

    return address;
  }

  public async save(address: AddressType): Promise<AddressType> {
    this.addresses.push(address);

    return address;
  }

  public async remove(address: AddressType): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    this.addresses.splice(addressIndex, 1);
  }
}

export default FakeAddressesTypesRepository;
