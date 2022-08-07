import Domain from "@modules/models/Domain";
import EnumEntity from "@modules/models/EnumEntity";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { DeepPartial, ObjectLiteral } from "typeorm";
import { IFilter } from "../interface/IFilter";
import { IFilterPaginated } from "../interface/IFilterPaginated";

export interface IGenericRepositoryProvider<T extends Domain | EnumEntity> {
  index({page,limit,findParams}:IFilterPaginated<T>): Promise<IPaginatedResponse<T>>;
  create(entity:DeepPartial<T>):T;
  findOne({where,relations}:IFilter<T>):Promise<T|undefined>;
  findAll({where,relations}:IFilter<T>):Promise<T[]>;
  remove(entity:T):void;
}
