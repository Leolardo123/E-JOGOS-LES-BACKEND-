import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Domain from "../Domain";
import Person from "../User/Person";
import CartItem from "./CartItem";

@Entity('tb_item_carts')
export default class Cart extends Domain {

    @Column()
    total_price: number;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItems: CartItem[];

    @ManyToOne(() => Person, person => person.carts)
    person: Person;

}