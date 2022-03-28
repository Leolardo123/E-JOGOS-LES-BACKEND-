import { RefreshToken } from "@modules/models/User/RefreshToken";
import { Repository } from "typeorm";

class RefreshTokensRepository extends Repository<RefreshToken>{
  constructor(){
    super()
  }
}

export default RefreshTokensRepository;
