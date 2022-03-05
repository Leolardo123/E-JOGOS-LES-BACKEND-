import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Address from "./Address";

@Entity('tb_places_types')
class PlaceType {

    @PrimaryColumn()
    readonly id: number;
    
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