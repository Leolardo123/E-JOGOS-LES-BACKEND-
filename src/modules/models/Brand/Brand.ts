import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import Domain from "../Domain";

@Entity('tb_brand')
class Brand extends Domain {
    
    @Column()
    name: string;
    
    @Column()
    image: string;

}

export default Brand;