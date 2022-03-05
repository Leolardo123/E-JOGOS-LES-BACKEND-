import Phone from "@modules/models/User/Phone";
import IPaginatedtRequest from "@shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { EntityRepository, Repository } from "typeorm";
import IPhonesRepository from "./interfaces/IPhonesRepository";

@EntityRepository(Phone)
class PhonesRepository extends Repository<Phone> implements IPhonesRepository {
  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedtRequest): Promise<IPaginatedResponse<Phone>> {
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

export default PhonesRepository;
