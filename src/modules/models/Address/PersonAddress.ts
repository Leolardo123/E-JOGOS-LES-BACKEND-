import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Address from "./Address";
import Person from "../User/Person";
import Domain from "../Domain";
import { StringMap } from "ts-jest";

@Entity('tb_person_addresses')
class PersonAddress extends Domain {

    @Column('uuid')
    person_id: string;
    
    @Column('uuid')
    address_id: string;

    @JoinColumn({name:'person_id'})
    @ManyToOne(() => Person, person => person.addresses)
    person?: Person;

    @JoinColumn({name:'address_id'})
    @OneToOne(() => Address, address => address.person_address, { cascade: true })
    address?: Address;

}

export default PersonAddress;