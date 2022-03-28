import User from "@modules/models/User/User";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository()
class UsersRepository extends Repository<User>{
  constructor(){
    super()
  }
}

export default UsersRepository;
