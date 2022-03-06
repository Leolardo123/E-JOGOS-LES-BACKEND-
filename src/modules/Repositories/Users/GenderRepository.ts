import Address from "@modules/models/Address/Address";
import Gender from "@modules/models/User/Gender";
import IPaginatedtRequest from "@shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { EntityRepository, Repository } from "typeorm";
import IGenderRepository from "./interfaces/IGenderRepository";

@EntityRepository(Gender)
class GendersRepository extends Repository<Gender> implements IGenderRepository{
  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedtRequest): Promise<IPaginatedResponse<Gender>> {
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

export default GendersRepository;
