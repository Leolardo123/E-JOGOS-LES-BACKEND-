import Address from "@modules/models/Address/Address";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";

export default interface IAddressesRepository {
  index({
    page,
    limit,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>>;
}
