import DomainRepository from "@modules/domain/repositories/DomainRepository";
import PersonAddress from "../models/PersonAddress";

export default class PersonAddressesRepository extends DomainRepository<PersonAddress> {
    constructor() {
        super(PersonAddress)
    }
}

