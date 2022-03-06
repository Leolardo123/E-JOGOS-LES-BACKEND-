import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Person from "../User/Person";
import AddressType from "./AddressType";
import PlaceType from "./PlaceType";

@Entity('tb_addresses')
class Address {

    @PrimaryColumn('uuid')
    readonly id: string;
    
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
    place_type_id: number;

    @Column()
    person_id: string;

    @JoinColumn({name:'address_type_id'})
    @ManyToOne(()=> AddressType, atype => atype.address,{
        onDelete:'RESTRICT',onUpdate:'CASCADE'
    })
    address_type: AddressType;

    @JoinColumn({name:'place_type_id'})
    @ManyToOne(()=> PlaceType, ptype => ptype.address,{
        onDelete:'RESTRICT',onUpdate:'CASCADE'
    })
    place_type: PlaceType;
    
    @JoinColumn({name:'person_id'})
    @OneToOne(()=> Person, person => person.address,{
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    person: PlaceType;
}

export default Address;