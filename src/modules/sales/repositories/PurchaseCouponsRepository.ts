import DomainRepository from "@modules/domain/repositories/DomainRepository";
import PurchaseCoupom from "../models/PurchaseCoupom";

export default class PurchaseCouponsRepository extends DomainRepository<PurchaseCoupom> {
    constructor() {
        super(PurchaseCoupom)
    }
}

