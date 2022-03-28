import Address from "@modules/models/Address/Address";
import { Repository } from "typeorm";

class AddressesRepository extends Repository<Address>{
  constructor(){
    super()
  }
}

export default AddressesRepository;
