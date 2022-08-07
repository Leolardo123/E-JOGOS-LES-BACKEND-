import DomainRepository from "@modules/domain/repositories/DomainRepository";
import CartItem from "../models/CartItem";

export default class CartItemsRepository extends DomainRepository<CartItem> {
    constructor() {
        super(CartItem)
    }
}

