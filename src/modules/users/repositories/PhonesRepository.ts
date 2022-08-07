import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Phone from "../models/Phone";

export default class PhonesRepository extends DomainRepository<Phone> {
    constructor() {
        super(Phone)
    }
}

