import Person from "@modules/models/User/Person";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreatePersonDTO from "../DTOS/ICreatePersonDTO";

export default interface IPersonsRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<Person>>;
    findById(id: string): Promise<Person | undefined>;
    findByIdHasRelations(
        id: string,
        relations: string[],
    ): Promise<Person | undefined>;
    create(data: ICreatePersonDTO): Person;
    save(person: Person): Promise<Person>;
    delete(id: string): Promise<void>;
}