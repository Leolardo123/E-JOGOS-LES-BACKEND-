import { Column, Entity, OneToOne } from "typeorm";
import Domain from "../Domain";
import Person from "../User/Person";
import Cart from "./Cart";

export enum PurchaseStatusEnum {
    PAID = "paid",
    PENDING = "pending",
    CANCELED = "canceled"
}

@Entity('tb_purchases')
export default class Purchase extends Domain{
    @Column()
    total_price: number;

    @Column()
    cart_id: string;

    @Column()
    payment_id: string;

    @Column()
    person_id: string;

    @Column({ enum: PurchaseStatusEnum, default: PurchaseStatusEnum.PENDING })
    status_id: string;

    @OneToOne(() => Cart)
    cart: Cart;

    @OneToOne(() => Person)
    person: Person;
}