import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Cart from "../models/Cart";

export default class CartsRepository extends DomainRepository<Cart> {
    constructor() {
        super(Cart)
    }
}

