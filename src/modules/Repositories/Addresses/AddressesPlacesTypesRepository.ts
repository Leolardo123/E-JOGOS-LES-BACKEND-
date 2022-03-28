import PlaceType from "@modules/models/Address/PlaceType";
import { Repository } from "typeorm";

class PlacesTypesRepository extends Repository<PlaceType>{
  constructor(){
    super()
  }
}

export default PlacesTypesRepository;
