import PlaceType from "@modules/models/Address/PlaceType";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePlaceTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(PlaceType)
        .values([
            {
                id:1,
                name:'casa',
            },
            {
                id:2,
                name:'apartamento',
            },
            {
                id:3,
                name:'condomínio',
            }
        ]).execute()
    }
}