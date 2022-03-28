import Gender from "@modules/models/User/Gender";
import { Repository } from "typeorm";

class UsersRepository extends Repository<Gender>{
  constructor(){
    super()
  }
}

export default UsersRepository;
