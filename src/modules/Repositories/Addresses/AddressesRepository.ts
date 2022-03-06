import Address from "@modules/models/Address/Address";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { EntityRepository, Repository } from "typeorm";
import IAddressesRepository from "./interfaces/IAddressesRepository";

@EntityRepository(Address)
class AddressesRepository extends Repository<Address> implements IAddressesRepository {
  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>> {
    const [ items, total] = whereParams
    ? await this
    .createQueryBuilder()
    .where(whereParams.where, whereParams.values)
    .skip((page-1) * limit)
    .take(limit)
    .getManyAndCount()
    : await this
    .createQueryBuilder()
    .where({})
    .skip((page-1) * limit)
    .take(limit)
    .getManyAndCount()
    return { results: items, total, page, limit };
  }
}

export default AddressesRepository;
