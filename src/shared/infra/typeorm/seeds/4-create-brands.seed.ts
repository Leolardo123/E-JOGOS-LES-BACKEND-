import Brand from "@modules/cards/models/Brand";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { v4 } from "uuid";

export default class CreateBrands implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Brand)
            .values([
                {
                    id: v4(),
                    name: "visa",
                    image: "/static/media/mastercard.66f6791b0dfb258f315e8c49adb8a42d.svg"
                },
                {
                    id: v4(),
                    name: "mastercard",
                    image: "https://www.casinotop10.com.br/wp-content/uploads/2020/05/master-card-logo-update.png"
                }
            ]).execute()
    }
}