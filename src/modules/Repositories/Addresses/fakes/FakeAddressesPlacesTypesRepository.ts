import PlaceType from "../../../models/Address/PlaceType";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreatePlaceTypeDTO from "../DTOS/ICreatePlaceTypeDTO";
import IPlacesTypesRepository from "../interfaces/IPlacesTypesRepository";

class FakePlacesTypesRepository implements IPlacesTypesRepository  {
  private types: PlaceType[] = [];

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>> {
    const minValue = (page - 1) * limit;
    const maxValue = minValue + limit;


    const filteredTypes = this.types.filter(
      PlaceType => PlaceType.id === 1,
    );
    const paginatedTypes = filteredTypes.slice(minValue, maxValue);

    return {
      results: paginatedTypes,
      limit,
      page,
      total: filteredTypes.length,
    };
  }

  public async findById(
    id: number,
  ): Promise<PlaceType | undefined> {
    const PlaceType = this.types
      .find(findPlaceType => findPlaceType.id === id);

    return PlaceType;
  }

  public create( data : ICreatePlaceTypeDTO): PlaceType {
    const placeType = new PlaceType();

    Object.assign(PlaceType, data);

    return placeType;
  }

  public async save(placeType: PlaceType): Promise<PlaceType> {
    this.types.push(placeType);

    return placeType;
  }

  public async remove(placeType: PlaceType): Promise<void> {
    const placeTypeIndex = this.types.findIndex(
      findPlaceType => findPlaceType.id === placeType.id,
    );

    this.types.splice(placeTypeIndex, 1);
  }
}

export default FakePlacesTypesRepository;
