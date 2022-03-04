import AddressType from "@modules/models/Address/AddressType";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateAddressTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(AddressType)
        .values([
            {
                id:1,
                name:'entrega',
            },
            {
                id:2,
                name:'cobrança',
            },
            {
                id:3,
                name:'cobrança/entrega',
            }
        ]).execute()
    }
}