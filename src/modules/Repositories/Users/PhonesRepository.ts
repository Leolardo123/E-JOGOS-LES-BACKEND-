import Phone from "@modules/models/User/Phone";
import AppError from "shared/errors/AppError";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import { Repository } from "typeorm";
import ICreatePhoneDTO from "./DTOS/ICreatePhoneDTO";
import IPhonesRepository from "./interfaces/IPhonesRepository";

class PhonesRepository implements IPhonesRepository {
  private repository: Repository<Phone>;

  public async index({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<Phone>> {
    throw new AppError(`not implemented`, 501);
  }

  public create(data: ICreatePhoneDTO): Phone {
    throw new AppError(`not implemented`, 501);
  }

  public async findById(id: string): Promise<Phone | undefined> {
    throw new AppError(`not implemented`, 501);
  }

  public async save(phone: Phone): Promise<Phone> {
    throw new AppError(`not implemented`, 501);
  }

  public async delete(id: string): Promise<void> {
    throw new AppError(`not implemented`, 501);
  }
}

export default PhonesRepository;
