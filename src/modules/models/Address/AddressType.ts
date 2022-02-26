import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Address from "./Address";

@Entity('tb_address_types')
class AddressType {

    @PrimaryColumn()
    id: number;
    
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