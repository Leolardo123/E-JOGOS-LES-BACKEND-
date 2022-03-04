import Address from "@modules/models/Address/Address";
import AppError from "../../../shared/errors/AppError";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { getRepository, Repository } from "typeorm";
import ICreateAddressDTO from "./DTOS/ICreateAddressDTO";
import IAddressesRepository from "./interfaces/IAddressesRepository";

class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>;

  constructor(){
    this.repository = getRepository(Address)
  }

  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Address>> {
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
    id: string,
  ): Promise<Address | undefined> {
    throw new AppError(`not implemented`,501)
  }

  public create( data : ICreateAddressDTO): Address {
    const address =  this.repository.create({...data})
    return address
  }

  public async save(address: Address): Promise<Address> {
    throw new AppError(`not implemented`,501)
  }

  public async remove(address: Address): Promise<void> {
    throw new AppError(`not implemented`,501)
  }
}

export default AddressesRepository;
