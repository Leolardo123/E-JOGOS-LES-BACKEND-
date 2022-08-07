import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { injectable } from "tsyringe";
import { DeepPartial, EntityTarget, getRepository, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import DomainNumber from "../models/DomainNumber";
import DomainUUID from "../models/DomainUUID";
import { IDomainRepository } from "./interfaces/IDomainRepository";
import { IFilter } from "./interfaces/IFilter";
import { IFilterPaginated } from "./interfaces/IFilterPaginated";

@injectable()
class DomainRepository<T extends DomainUUID | DomainNumber> implements IDomainRepository<T> {
  private repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = getRepository<T>(entity);
  }

  public async index({
    page = 1,
    limit = 10,
    findParams,
  }: IFilterPaginated<T>): Promise<IPaginatedResponse<T>> {
    const [results, total] = findParams?.where ?
      await this.repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        where: { ...findParams.where }
      }) : await this.repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      })
    return { results, total, limit, page }
  }

  public create(entity: DeepPartial<T>): T {
    return this.repository.create(entity)
  }

  public async findOne({ where, relations }: IFilter<T>): Promise<T | undefined> {
    return await this.repository.findOne({
      where: {
        ...where
      },
      relations
    })
  }

  public async findAll({ where, relations }: IFilter<T>): Promise<T[]> {
    return await this.repository.find({
      where: {
        ...where
      },
      relations
    })
  }

  public async update(entity_id: string, entity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return await this.repository.update(entity_id, entity);
  }

  public async save(entity: DeepPartial<T>): Promise<DeepPartial<T>> {
    return await this.repository.save(entity);
  }

  public async remove(entity: T): Promise<void> {
    await this.repository.remove(entity)
  }
}

export default DomainRepository;
