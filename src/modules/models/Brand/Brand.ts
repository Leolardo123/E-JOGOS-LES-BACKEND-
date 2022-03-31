import { Expose } from "class-transformer";
import { Column, Entity } from "typeorm";
import Domain from "../Domain";

@Entity('tb_brand')
class Brand extends Domain {
    
    @Column()
    name: string;
    
    @Column()
    image: string;

    @Expose({ name: 'image_url' })
    getImageUrl(): string {
        return `http://localhost:3333/files/${this.image}`;
    }
    
}

export default Brand;