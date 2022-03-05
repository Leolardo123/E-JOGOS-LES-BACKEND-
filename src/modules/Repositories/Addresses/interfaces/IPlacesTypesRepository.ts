import PlaceType from "@modules/models/Address/PlaceType";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreatePlaceTypeDTO from "../DTOS/ICreatePlaceTypeDTO";

export default interface IPlacesTypesRepository {
  index({
    page,
    limit,
  }: IPaginatedRequest): Promise<IPaginatedResponse<PlaceType>>;
  findById(id: number): Promise<PlaceType | undefined>;
}
