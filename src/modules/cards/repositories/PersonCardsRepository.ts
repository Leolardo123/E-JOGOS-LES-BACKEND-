import DomainRepository from "@modules/domain/repositories/DomainRepository";
import PersonCard from "../models/PersonCard";

export default class PersonCardsRepository extends DomainRepository<PersonCard> {
    constructor() {
        super(PersonCard)
    }
}

