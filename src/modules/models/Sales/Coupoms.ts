import { Column, Entity } from "typeorm";
import Domain from "../Domain";

export enum CoupomTypeEnum {
    DISCOUNT = "discount",
    FREE_PRODUCT = "free_product",
}

@Entity()
export default class Coupom extends Domain {
    @Column()
    code: string;

    @Column({ default: 0 })
    value: number;

    @Column({ enum: CoupomTypeEnum, default: CoupomTypeEnum.FREE_PRODUCT })
    type_id: string;
}