import DomainUUID from "@modules/domain/models/DomainUUID";
import Cart from "./Cart";
import Person from "@modules/users/models/Person";
import { Column, Entity, OneToOne } from "typeorm";
import { PurchaseStatusEnum } from "./enum/PurchaseStatus";

@Entity('tb_purchases')
export default class Purchase extends DomainUUID {
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