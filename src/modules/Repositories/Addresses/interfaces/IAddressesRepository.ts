import Address from "@modules/models/Address/Address";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreateAddressDTO from "../DTOS/ICreateAddressDTO";

export default interface IAddressesRepository {
  index({
    page,
    limit,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>>;
  findById(id:string): Promise<Address | undefined>;
  create(data: ICreateAddressDTO): Address;
  save(address: Address): Promise<Address>;
  remove(address: Address): Promise<void>;
}
