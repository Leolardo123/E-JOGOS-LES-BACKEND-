import Person from "@modules/models/User/Person";
import { Repository } from "typeorm";

class PersonsRepository extends Repository<Person>{
  constructor(){
    super()
  }
}

export default PersonsRepository;
