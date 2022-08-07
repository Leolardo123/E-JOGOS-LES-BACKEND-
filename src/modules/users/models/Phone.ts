import DomainUUID from "@modules/domain/models/DomainUUID";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Person from "./Person";

@Entity('tb_phones')
class Phone extends DomainUUID {

    @Column()
    number: string;

    @Column()
    ddd: number;

    @Column()
    person_id: string;

    @JoinColumn({ name: 'person_id' })
    @OneToOne(() => Person, person => person.phone, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

}

export default Phone;