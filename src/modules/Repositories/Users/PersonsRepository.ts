import Person from "@modules/models/User/Person";
import AppError from "shared/errors/AppError";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { Repository } from "typeorm";
import ICreatePersonDTO from "./DTOS/ICreatePersonDTO";
import IPersonsRepository from "./interfaces/IPersonsRepository";

class PersonsRepository implements IPersonsRepository {
  private repository: Repository<Person>;

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Person>> {
    throw new AppError(`not implemented`, 501);
  }

  public create(data: ICreatePersonDTO): Person {
    throw new AppError(`not implemented`, 501);
  }

  public async findById(id: string): Promise<Person | undefined> {
    throw new AppError(`not implemented`, 501);
  }

  public async findByIdHasRelations(
    id: string,
    relations: string[]
  ): Promise<Person | undefined> {
    throw new AppError(`not implemented`, 501);
  }

  public async save(person: Person): Promise<Person> {
    throw new AppError(`not implemented`, 501);
  }

  public async delete(id: string): Promise<void> {
    throw new AppError(`not implemented`, 501);
  }
}

export default PersonsRepository;
