import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import AddressType from "./AddressType";
import PlaceType from "./PlaceType";

@Entity('tb_addresses')
class Address {

    @PrimaryColumn()
    id: string;
    
    @Column()
    cep: string;
    
    @Column()
    number: number;
    
    @Column()
    address_type_id: number;
    
    @Column()
    city: string;
    
    @Column()
    state: string;
    
    @Column()
    country: string;
    
    @Column({nullable:true})
    complement?: string;
    
    @Column()
    neighborhood: string;
    
    @Column()
    place: string;
    
    @Column()
    place_type_id: string;

    @JoinColumn({name:'address_type_id'})
    @ManyToOne(()=> AddressType, atype => atype.address)
    address_type: AddressType;

    @JoinColumn({name:'place_type_id'})
    @ManyToOne(()=> PlaceType, ptype => ptype.address)
    place_type: PlaceType;
}

export default Address;