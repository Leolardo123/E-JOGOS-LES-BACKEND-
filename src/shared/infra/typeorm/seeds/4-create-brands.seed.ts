import Brand from "@modules/models/Brand/Brand";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateBrands implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(Brand)
        .values([
            {
                name: "visa",
                image: "/static/media/mastercard.66f6791b0dfb258f315e8c49adb8a42d.svg"
            },
            {
                name: "mastercard",
                image: "https://www.casinotop10.com.br/wp-content/uploads/2020/05/master-card-logo-update.png"
            }
        ]).execute()
    }
}