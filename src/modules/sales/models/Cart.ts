import DomainUUID from "@modules/domain/models/DomainUUID";
import Person from "@modules/users/models/Person";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import CartItem from "./CartItem";
import { CartStatusEnum } from "./enum/CartStatus";


@Entity('tb_item_carts')
export default class Cart extends DomainUUID {

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