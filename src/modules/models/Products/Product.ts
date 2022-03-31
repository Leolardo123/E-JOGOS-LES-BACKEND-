import { Expose } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import Domain from "../Domain";
import CartItem from "../Sales/CartItem";

@Entity("tb_products")
export default class Product extends Domain{
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    cart_id: string;
    
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
    image: string;

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    items: CartItem[];

    @Expose({ name: 'image_url' })
    getImage(): string {
        return `http://localhost:3333/files/${this.image}`;
    }
}