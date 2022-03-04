import { getRepository, Repository } from "typeorm";

import AddressType from "@modules/models/Address/AddressType";
import AppError from "shared/errors/AppError";

import ICreateAddressTypeDTO from "./DTOS/ICreateAddressTypeDTO";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import IAddressesTypesRepository from "./interfaces/IAddressesTypesRepository";

class AddressesTypesRepository implements IAddressesTypesRepository  {
  private repository: Repository<AddressType>;

  constructor() {
    this.repository = getRepository(AddressType);
  }

  public async index({
    page = 1,
    limit = 10,
    whereParams
  }: IPaginatedRequest): Promise<IPaginatedResponse<AddressType>> {
    const [ items, total] = whereParams
    ? await this.repository
    .createQueryBuilder()
    .where(whereParams.where, whereParams.values)
    .skip((page-1) * limit)
    .take(limit)
    .getManyAndCount()
    : await this.repository
    .createQueryBuilder()
    .where({})
    .skip((page-1) * limit)
    .take(limit)
    .getManyAndCount()
    return { results: items, total, page, limit };
  }

  public async findById(
    id: number,
  ): Promise<AddressType | undefined> {
    throw new AppError(`not implemented`,501)
  }

  public create( data : ICreateAddressTypeDTO): AddressType {
    throw new AppError(`not implemented`,501)
  }

  public async save(addressType: AddressType): Promise<AddressType> {
    throw new AppError(`not implemented`,501)
  }

  public async remove(addressType: AddressType): Promise<void> {
    throw new AppError(`not implemented`,501)
  }
}

export default AddressesTypesRepository;
