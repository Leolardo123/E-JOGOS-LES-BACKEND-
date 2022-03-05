import Person from "@modules/models/User/Person";
import IPaginatedtRequest from "@shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { EntityRepository, Repository } from "typeorm";
import IPersonsRepository from "./interfaces/IPersonsRepository";

@EntityRepository(Person)
class PersonsRepository extends Repository<Person> implements IPersonsRepository {
  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedtRequest): Promise<IPaginatedResponse<Person>> {
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

export default PersonsRepository;
