import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Card from "../models/Card";

export default class CardsRepository extends DomainRepository<Card> {
    constructor() {
        super(Card)
    }
}

