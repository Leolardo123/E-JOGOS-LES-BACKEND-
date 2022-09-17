import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Domain from "../Domain";
import Person from "./Person";


@Entity('tb_phones')
class Phone extends Domain {
    
    @Column()
    number: string;
    
    @Column()
    ddd: number;

    @Column()
    person_id: string;

    @JoinColumn({name:'person_id'})
    @OneToOne(() => Person, person => person.phone, {
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    person: Person;

}

export default Phone;