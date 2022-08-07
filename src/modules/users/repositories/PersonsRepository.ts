import DomainRepository from "@modules/domain/repositories/DomainRepository";
import Person from "../models/Person";

export default class PersonsRepository extends DomainRepository<Person> {
    constructor() {
        super(Person)
    }
}

