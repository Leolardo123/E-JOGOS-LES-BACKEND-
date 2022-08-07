import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Purchase from "../models/Purchase";

export default class PurchasesRepository extends DomainRepository<Purchase> {
    constructor() {
        super(Purchase)
    }
}

