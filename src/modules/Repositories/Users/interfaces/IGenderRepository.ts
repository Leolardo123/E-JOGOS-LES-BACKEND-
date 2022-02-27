import Gender from "@modules/models/User/Gender";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";

export default interface IGenderRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<Gender>>;
    findById(id: number): Promise<Gender | undefined>;
}