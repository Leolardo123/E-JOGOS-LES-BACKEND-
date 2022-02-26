import User from "@modules/models/User/User";
import IPaginatedRequest from "shared/interfaces/IPaginatedRequest";
import IPaginatedResponse from "shared/interfaces/IPaginatedResponse";
import ICreateUserDTO from "../DTOS/ICreateUserDTO";
import IUsersRepository from "../interfaces/IUsersRepository";


class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

    public async index({ 
            page = 1, 
            limit = 10
        }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
        const minValue = (page - 1) * limit;
        const maxValue = minValue + limit;
    
        const filteredUsers = this.users.filter(
          user => user.id === '1',
        );
        const paginatedusers = filteredUsers.slice(minValue, maxValue);
    
        return {
          results: paginatedusers,
          limit,
          page,
          total: filteredUsers.length,
        };
    }

    public create(data: ICreateUserDTO): User {
        const user = new User()

        Object.assign(user,data)

        return user
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id = id)
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email = email)
    }

    public async findByIdHasRelations(id: string, relations: string[]): Promise<User | undefined> {
        return this.users.find(user => {
            let contains = true
            for(let relation of relations){
                if(!Object.keys(user).includes(relation)){ contains = false; break; }
            }
            if(contains && user.id == id) return user
        })
    }

    public async save(user: User): Promise<User> {
        this.users.push(user)
        return user
    }

    public async delete(id: string): Promise<void> {
        const index = this.users.findIndex(user => user.id = id)
        this.users.splice(index,1)
    }
}

export default FakeUsersRepository;
