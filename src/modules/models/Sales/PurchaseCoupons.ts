import { Column, Entity, ManyToOne, OneToOne, Unique } from "typeorm";
import Coupom from "./Coupons";
import Domain from "../Domain";
import Purchase from "./Purchase";

@Entity('tb_purchases_coupons')
@Unique(['purchase_id', 'coupon_id'])
export default class PurchaseCoupom extends Domain {
    @Column()
    coupon_id: string;

    @Column()
    purchase_id: string;

    @ManyToOne(() => Purchase)
    purchase: Purchase;

    @OneToOne(() => Coupom)
    coupom: Coupom;
}