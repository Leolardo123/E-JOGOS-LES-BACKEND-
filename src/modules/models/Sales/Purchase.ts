import { Column, Entity } from "typeorm";
import Domain from "../Domain";

export enum PurchaseStatusEnum {
    PENDING = "pending",
    PAID = "paid",
    CANCELED = "canceled"
}

@Entity('tb_purchases')
export default class Purchase extends Domain{

    @Column()
    total_price: number;

    @Column()
    person_id: string;

    @Column({ enum: PurchaseStatusEnum, default: PurchaseStatusEnum.PENDING })
    status_id: string;

    @Column()
    payment_id: string;

}