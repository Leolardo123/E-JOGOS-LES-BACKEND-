import PlaceType from "@modules/models/Address/PlaceType";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { EntityRepository, Repository } from "typeorm";
import IPlacesTypesRepository from "./interfaces/IPlacesTypesRepository";

@EntityRepository(PlaceType)
class PlacesTypesRepository extends Repository<PlaceType> implements IPlacesTypesRepository {
  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
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

export default PlacesTypesRepository;
