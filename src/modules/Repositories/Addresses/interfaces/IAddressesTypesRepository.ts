import AddressType from "@modules/models/Address/AddressType";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreateAddressTypeDTO from "../DTOS/ICreateAddressTypeDTO";

export default interface IAddressesTypesRepository {
  index({
    page,
    limit,
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>>;
  findById(id: number): Promise<AddressType | undefined>;
  create(data: ICreateAddressTypeDTO): AddressType;
  save(type: AddressType): Promise<AddressType>;
  remove(type: AddressType): Promise<void>;
}
