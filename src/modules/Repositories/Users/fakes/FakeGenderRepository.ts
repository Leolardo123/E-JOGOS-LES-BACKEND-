import Gender from "@modules/models/User/Gender";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import IGenderRepository from "../interfaces/IGenderRepository";

class FakeGendersRepository implements IGenderRepository {
  private genders: Gender[] = [];

    public async index({ 
            page = 1, 
            limit = 10
        }: IPaginatedRequest): Promise<IPaginatedResponse<Gender>> {
        const minValue = (page - 1) * limit;
        const maxValue = minValue + limit;
    
        const filteredGenders = this.genders.filter(
          gender => gender.id === 1,
        );
        const paginatedGenders = filteredGenders.slice(minValue, maxValue);
    
        return {
          results: paginatedGenders,
          limit,
          page,
          total: filteredGenders.length,
        };
    }

    public async findById(id: number): Promise<Gender | undefined> {
        return this.genders.find(gender => gender.id = id)
    }

}

export default FakeGendersRepository;
