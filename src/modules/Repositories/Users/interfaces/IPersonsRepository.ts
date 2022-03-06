import Person from "@modules/models/User/Person";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";

export default interface IPersonsRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<Person>>;
}