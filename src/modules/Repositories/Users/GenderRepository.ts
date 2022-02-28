import Gender from "@modules/models/User/Gender";
import AppError from "shared/errors/AppError";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { Repository } from "typeorm";
import IGenderRepository from "./interfaces/IGenderRepository";

class GendersRepository implements IGenderRepository {
  private repository: Repository<Gender>;

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Gender>> {
    throw new AppError(`not implemented`, 501);
  }

  public async findById(id: number): Promise<Gender | undefined> {
    throw new AppError(`not implemented`, 501);
  }
}

export default GendersRepository;
