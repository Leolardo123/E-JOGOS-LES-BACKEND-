import DomainNumber from "@modules/domain/models/DomainNumber";
import { Column, Entity, ManyToOne } from "typeorm";
import Person from "./Person";

@Entity('tb_genders')
class Gender extends DomainNumber {

    @Column()
    name: string;

    @ManyToOne(() => Person, person => person.gender)
    persons: Person[]

}

export default Gender;