import Domain from "@modules/models/Domain";
import EnumEntity from "@modules/models/EnumEntity";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { DeepPartial, EntityTarget, getRepository, Repository } from "typeorm";
import { IFilter } from "../interface/IFilter";
import { IFilterPaginated } from "../interface/IFilterPaginated";
import { IGenericRepositoryProvider } from "../models/IGenericRepositoryProvider";

class GenericRepositoryProvider<T extends Domain | EnumEntity> implements IGenericRepositoryProvider<T> {
  private repository: Repository<T>;

  constructor(entity: EntityTarget<T>){
    this.repository = getRepository(entity);
  }

  public async index({
    page = 1,
    limit = 10,
    findParams,
  }:IFilterPaginated<T>): Promise<IPaginatedResponse<T>>{
    const [ results, total ] = findParams?.where ? 
         await this.repository.findAndCount({
      skip: (page-1) * limit,
      take: limit,
      where: { ...findParams.where }
    }) : await this.repository.findAndCount({
      skip: (page-1) * limit,
      take: limit,
    })
    return { results, total, limit, page}
  }

  public create(entity:DeepPartial<T>):T{
    return this.repository.create(entity)
  }

  public async findOne({where,relations}:IFilter<T>):Promise<T | undefined>{
    return await this.repository.findOne({
      where:{ 
        ...where
      },
      relations
    })
  }

  public async findAll({where,relations}:IFilter<T>):Promise<T[]>{
    return await this.repository.find({
      where:{ 
        ...where
      },
      relations
    })
  }

  public remove(entity:T):void{
    this.repository.remove(entity)
  }
}

export default GenericRepositoryProvider;
