import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Brand from "../models/Brand";

export default class BrandsRepository extends DomainRepository<Brand> {
    constructor() {
        super(Brand)
    }
}

