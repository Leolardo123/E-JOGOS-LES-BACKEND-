import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import Domain from "../Domain";

@Entity('tb_brand')
class Brand extends Domain {
    
    @Column()
    name: string;
    
    @Column()
    image: string;

    // @Column()
    // image_url: string;

    // @BeforeInsert()
    // @BeforeUpdate()
    // async getImageUrl() {
    //     if (this.image) {
    //         this.image_url = `${process.env.APP_URL}/images/brands/${this.image}`;
    //     }
    // }
}

export default Brand;