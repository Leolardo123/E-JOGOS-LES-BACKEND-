import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Domain from "../Domain";
import Person from "../User/Person";
import CartItem from "./CartItem";

export enum CartStatusEnum{
    CART_STATUS_OPEN = 'open',
    CART_STATUS_CLOSED = 'closed'
}

@Entity('tb_item_carts')
export default class Cart extends Domain {

    @Column()
    total_price: number;

    @Column()
    person_id: string;

    @Column({ enum: CartStatusEnum, default: CartStatusEnum.CART_STATUS_OPEN })
    status_id: string;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        eager: true
    })
    cartItems: CartItem[];

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.carts)
    person: Person;
}