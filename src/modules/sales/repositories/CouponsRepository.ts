import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Coupom from "../models/Coupom";

export default class CouponsRepository extends DomainRepository<Coupom> {
    constructor() {
        super(Coupom)
    }
}

