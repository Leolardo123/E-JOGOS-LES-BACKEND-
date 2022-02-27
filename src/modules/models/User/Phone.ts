import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Person from "./Person";


@Entity('tb_phones')
class Phone {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    number: string;
    
    @Column()
    ddd: string;

    @Column()
    person_id: string;

    @JoinColumn({name:'person_id'})
    @OneToOne(() => Person, person => person.phone, {
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    person: Person;

}

export default Phone;