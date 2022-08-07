import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Product from "../models/Product";

export default class ProductsRepository extends DomainRepository<Product> {
    constructor() {
        super(Product)
    }
}

