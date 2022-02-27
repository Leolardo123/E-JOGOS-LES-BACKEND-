import Person from "@modules/models/User/Person";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreatePersonDTO from "../DTOS/ICreatePersonDTO";
import IPersonsRepository from "../interfaces/IPersonsRepository";

class FakePersonsRepository implements IPersonsRepository {
  private persons: Person[] = [];

    public async index({ 
            page = 1, 
            limit = 10
        }: IPaginatedRequest): Promise<IPaginatedResponse<Person>> {
        const minValue = (page - 1) * limit;
        const maxValue = minValue + limit;
    
        const filteredpersons = this.persons.filter(
          person => person.id === '1',
        );
        const paginatedpersons = filteredpersons.slice(minValue, maxValue);
    
        return {
          results: paginatedpersons,
          limit,
          page,
          total: filteredpersons.length,
        };
    }

    public create(data: ICreatePersonDTO): Person {
        const person = new Person()

        Object.assign(person,data)

        return person
    }

    public async findById(id: string): Promise<Person | undefined> {
        return this.persons.find(person => person.id = id)
    }

    public async findByIdHasRelations(id: string, relations: string[]): Promise<Person | undefined> {
        return this.persons.find(person => {
            let contains = true
            for(let relation of relations){
                if(!Object.keys(person).includes(relation)){ contains = false; break; }
            }
            if(contains && person.id == id) return person
        })
    }

    public async save(person: Person): Promise<Person> {
        this.persons.push(person)
        return person
    }

    public async delete(id: string): Promise<void> {
        const index = this.persons.findIndex(person => person.id = id)
        this.persons.splice(index,1)
    }
}

export default FakePersonsRepository;
