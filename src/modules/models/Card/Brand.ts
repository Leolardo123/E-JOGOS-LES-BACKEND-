import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Domain from "../Domain";

@Entity('tb_brand')
class Brand extends Domain {
    
    @Column()
    name: string;
    
    @Column()
    image_link: string;
    
}

export default Brand;