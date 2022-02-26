import User from "@modules/models/User/User";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreateUserDTO from "../DTOS/ICreateUserDTO";

export default interface IUsersRepository {
    index({page,limit}:IPaginatedRequest): Promise<IPaginatedResponse<User>>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByIdHasRelations(
        id: string,
        relations: string[],
    ): Promise<User | undefined>;
    create(data: ICreateUserDTO): User;
    save(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}