import DomainUUID from "@modules/domain/models/DomainUUID";
import { Column, Entity } from "typeorm";

@Entity("tb_products")
export default class Product extends DomainUUID {

    @Column({ default: true })
    isActive: boolean;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    stock: number;

    @Column()
    requirements: string;

    @Column()
    publisher: string;

    @Column()
    developer: string;

    @Column()
    guarantee: string;

    @Column()
    language: string;

    @Column()
    subtitle: string;

    @Column()
    release_date: string;

    @Column()
    recomended_age: number;

    @Column()
    players_offline: number;

    @Column()
    players_online: number;

    @Column()
    resolution: string;

    @Column()
    image: string;

    getImageUrl() {
        if (this.image) {
            return `http://localhost:3333/files/${this.image}`;
        }
        return 'no image';
    }
}