import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Address from "../models/Address";

export default class AddressesRepository extends DomainRepository<Address> {
    constructor() {
        super(Address)
    }
}

