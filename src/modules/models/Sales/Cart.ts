import AppError from "@shared/errors/AppError";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
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
        onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, orphanedRowAction: 'delete',
        eager: true
    })
    cartItems: CartItem[];

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.carts)
    person: Person;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        if (this.cartItems.length < 1) {
            throw new AppError('Carrinho deve conter pelo menos 1 item');
        }
    }
}