import { Column, Entity, OneToMany } from "typeorm";
import EnumEntity from "../EnumEntity";
import Address from "./Address";

@Entity('tb_addresses_types')
class AddressType extends EnumEntity {
    
    @Column()
    name: string;

    @Column({nullable:true})
    description: string;

    @OneToMany(() => Address, address => address.address_type,{
        onDelete:'RESTRICT',onUpdate:'CASCADE'
    })
    address: Address
    
}

export default AddressType;