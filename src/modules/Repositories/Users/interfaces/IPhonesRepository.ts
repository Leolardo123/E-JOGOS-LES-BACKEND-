import Phone from "@modules/models/User/Phone";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";

export default interface IPhonesRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<Phone>>;
}