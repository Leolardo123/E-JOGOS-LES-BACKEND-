import Phone from "@modules/models/User/Phone";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreatePhoneDTO from "../DTOS/ICreatePhoneDTO";
import IPhonesRepository from "../interfaces/IPhonesRepository";

class FakePhonesRepository implements IPhonesRepository {
  private phones: Phone[] = [];

    public async index({ 
            page = 1, 
            limit = 10
        }: IPaginatedRequest): Promise<IPaginatedResponse<Phone>> {
        const minValue = (page - 1) * limit;
        const maxValue = minValue + limit;
    
        const filteredPhones = this.phones.filter(
          phone => phone.id === '1',
        );
        const paginatedPhones = filteredPhones.slice(minValue, maxValue);
    
        return {
          results: paginatedPhones,
          limit,
          page,
          total: filteredPhones.length,
        };
    }

    public create(data: ICreatePhoneDTO): Phone {
        const phone = new Phone()

        Object.assign(phone,data)

        return phone
    }

    public async findById(id: string): Promise<Phone | undefined> {
        return this.phones.find(phone => phone.id = id)
    }

    public async save(phone: Phone): Promise<Phone> {
        this.phones.push(phone)
        return phone
    }

    public async delete(id: string): Promise<void> {
        const index = this.phones.findIndex(phone => phone.id = id)
        this.phones.splice(index,1)
    }
}

export default FakePhonesRepository;
