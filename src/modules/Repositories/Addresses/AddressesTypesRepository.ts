import AddressType from "@modules/models/Address/AddressType";
import { Repository } from "typeorm";

class AddressesTypesRepository extends Repository<AddressType>{
  constructor(){
    super()
  }
}

export default AddressesTypesRepository;
