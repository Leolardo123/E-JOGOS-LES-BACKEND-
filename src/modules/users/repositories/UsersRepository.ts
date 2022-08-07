import DomainRepository from "@modules/domain/repositories/DomainRepository";
import User from "../models/User";

export default class UsersRepository extends DomainRepository<User> {
    constructor() {
        super(User)
    }
}

