import User from "@modules/models/User/User";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";

export default interface IUsersRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<User>>;
}