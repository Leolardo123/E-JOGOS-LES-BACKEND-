import DomainRepository from "@modules/domain/repositories/DomainRepository";
import PlaceType from "../models/PlaceType";

export default class PlaceTypesRepository extends DomainRepository<PlaceType> {
    constructor() {
        super(PlaceType)
    }
}

