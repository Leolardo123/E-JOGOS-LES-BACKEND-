import { Column, Entity, OneToMany } from "typeorm";
import EnumEntity from "../EnumEntity";
import Address from "./Address";

@Entity('tb_places_types')
class PlaceType extends EnumEntity {
    
    @Column()
    name: string;

    @Column({nullable:true})
    description: string;

    @OneToMany(() => Address, address => address.place_type,{
        onDelete:'RESTRICT',onUpdate:'CASCADE'
    })
    address: Address

}

export default PlaceType;