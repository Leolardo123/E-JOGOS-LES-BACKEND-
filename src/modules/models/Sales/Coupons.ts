import { Column, Entity, OneToOne } from "typeorm";
import Domain from "../Domain";
import PurchaseCoupom from "./PurchaseCoupons";

export enum CoupomTypeEnum {
    DISCOUNT = "discount",
    RETURN_PRODUCT = "return_product",
}

@Entity()
export default class Coupom extends Domain {
    @Column()
    code: string;

    @Column({ default: 0 })
    value: number;

    @Column({ enum: CoupomTypeEnum, default: CoupomTypeEnum.RETURN_PRODUCT })
    type_id: string;

    @OneToOne(() => PurchaseCoupom)
    used_in: PurchaseCoupom;
}