import { EntityRepository, getRepository, Repository } from "typeorm";

import AddressType from "@modules/models/Address/AddressType";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import IAddressesTypesRepository from "./interfaces/IAddressesTypesRepository";

@EntityRepository(AddressType)
class AddressesTypesRepository extends Repository<AddressType> implements IAddressesTypesRepository  {
  public async index({
    page = 1,
    limit = 10,
    whereParams
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
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

export default AddressesTypesRepository;
