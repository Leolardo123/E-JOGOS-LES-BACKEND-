import PlaceType from "@modules/models/Address/PlaceType";
import AppError from "shared/errors/AppError";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { getRepository, Repository } from "typeorm";
import ICreatePlaceTypeDTO from "./DTOS/ICreatePlaceTypeDTO";
import IPlacesTypesRepository from "./interfaces/IPlacesTypesRepository";


class PlacesTypesRepository implements IPlacesTypesRepository  {
  private repository: Repository<PlaceType>;

  constructor() {
    this.repository = getRepository(PlaceType);
  }

  public async index({
    page = 1,
    limit = 10,
    whereParams,
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
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
    id: number,
  ): Promise<PlaceType | undefined> {
    throw new AppError(`not implemented`,501)
  }

  public create( data : ICreatePlaceTypeDTO): PlaceType {
    throw new AppError(`not implemented`,501)
  }

  public async save(placeType: PlaceType): Promise<PlaceType> {
    throw new AppError(`not implemented`,501)
  }

  public async remove(placeType: PlaceType): Promise<void> {
    throw new AppError(`not implemented`,501)
  }
}

export default PlacesTypesRepository;
