import PersonAddress from "@modules/models/Address/PersonAddress";
import { Repository } from "typeorm";

class PersonsAddressesRepository extends Repository<PersonAddress>{
  constructor(){
    super()
  }
}

export default PersonsAddressesRepository;
