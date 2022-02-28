import User from "@modules/models/User/User";
import AppError from "shared/errors/AppError";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { Repository } from "typeorm";
import ICreateUserDTO from "./DTOS/ICreateUserDTO";
import IUsersRepository from "./interfaces/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
    throw new AppError(`not implemented`, 501);
  }

  public create(data: ICreateUserDTO): User {
    throw new AppError(`not implemented`, 501);
  }

  public async findById(id: string): Promise<User | undefined> {
    throw new AppError(`not implemented`, 501);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    throw new AppError(`not implemented`, 501);
  }

  public async findByIdHasRelations(
    id: string,
    relations: string[]
  ): Promise<User | undefined> {
    throw new AppError(`not implemented`, 501);
  }

  public async save(user: User): Promise<User> {
    throw new AppError(`not implemented`, 501);
  }

  public async delete(id: string): Promise<void> {
    throw new AppError(`not implemented`, 501);
  }
}

export default UsersRepository;
