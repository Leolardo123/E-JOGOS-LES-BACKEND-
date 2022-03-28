import Phone from "@modules/models/User/Phone";
import { Repository } from "typeorm";

class PhonesRepository extends Repository<Phone>{
  constructor(){
    super()
  }
}

export default PhonesRepository;
