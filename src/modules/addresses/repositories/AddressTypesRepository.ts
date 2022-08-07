import DomainRepository from "@modules/domain/repositories/DomainRepository";
import AddressType from "../models/AddressType";

export default class AddressTypesRepository extends DomainRepository<AddressType> {
    constructor() {
        super(AddressType)
    }
}
