import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Gender from "../models/Gender";

export default class GendersRepository extends DomainRepository<Gender> {
    constructor() {
        super(Gender)
    }
}

