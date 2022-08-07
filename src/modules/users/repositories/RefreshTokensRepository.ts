import DomainRepository from "@modules/domain/repositories/DomainRepository";
import { RefreshToken } from "../models/RefreshToken";

export default class RefreshTokensRepository extends DomainRepository<RefreshToken> {
    constructor() {
        super(RefreshToken)
    }
}

