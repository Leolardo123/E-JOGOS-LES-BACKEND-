import DomainNumber from "@modules/domain/models/DomainNumber";
import { Column, Entity, OneToMany } from "typeorm";
import Address from "./Address";

@Entity('tb_addresses_types')
class AddressType extends DomainNumber {

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Address, address => address.address_type, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    address: Address

}

export default AddressType;