import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Person from "./Person";


@Entity('tb_phones')
class Address {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    number: string;
    
    @Column()
    ddd: string;

    @Column()
    person_id: string;

    @JoinColumn({name:'person_id'})
    @OneToOne(() => Person,{
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    person: Person;

}

export default Address;