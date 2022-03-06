import Gender from "@modules/models/User/Gender";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateGenderTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(Gender)
        .values([
            {
                id:1,
                name:'masculino',
            },
            {
                id:2,
                name:'feminino',
            },
            {
                id:3,
                name:'outro',
            }
        ]).execute()
    }
}