import User from "@modules/models/User/User";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { EntityRepository, Repository } from "typeorm";
import IUsersRepository from "./interfaces/IUsersRepository";

@EntityRepository(User)
class UsersRepository extends Repository<User> implements IUsersRepository{
  public async index({
    page = 1,
    limit = 10,
    whereParams
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
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

export default UsersRepository;
