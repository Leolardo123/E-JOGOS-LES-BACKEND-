import DomainUUID from "@modules/domain/models/DomainUUID";
import { Column, Entity, OneToOne } from "typeorm";
import { CoupomTypeEnum } from "./enum/CoupomTypes";
import PurchaseCoupom from "./PurchaseCoupom";

@Entity()
export default class Coupom extends DomainUUID {
    @Column()
    code: string;

    @Column({ default: 0 })
    value: number;

    @Column({ enum: CoupomTypeEnum, default: CoupomTypeEnum.RETURN_PRODUCT })
    type_id: string;

    @OneToOne(() => PurchaseCoupom)
    purchase: PurchaseCoupom;
}