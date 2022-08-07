import DomainUUID from "@modules/domain/models/DomainUUID";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { DeepPartial } from "typeorm";
import { IFilter } from "./IFilter";
import DomainNumber from "../../models/DomainNumber";
import { IFilterPaginated } from "./IFilterPaginated";

export interface IDomainRepository<T extends DomainUUID | DomainNumber> {
  index({ page, limit, findParams }: IFilterPaginated<T>): Promise<IPaginatedResponse<T>>;
  create(entity: DeepPartial<T>): T;
  findOne({ where, relations }: IFilter<T>): Promise<T | undefined>;
  findAll({ where, relations }: IFilter<T>): Promise<T[]>;
  save(entity: DeepPartial<T>): Promise<DeepPartial<T>>;
  remove(entity: T): void;
}
