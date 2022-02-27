import Phone from "@modules/models/User/Phone";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreatePhoneDTO from "../DTOS/ICreatePhoneDTO";

export default interface IPhonesRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<Phone>>;
    findById(id: string): Promise<Phone | undefined>;
    create(data: ICreatePhoneDTO): Phone;
    save(phone: Phone): Promise<Phone>;
    delete(id: string): Promise<void>;
}