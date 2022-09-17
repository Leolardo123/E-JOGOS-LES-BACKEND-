import { Column, Entity, ManyToOne } from "typeorm";
import EnumEntity from "../EnumEntity";
import Person from "./Person";

@Entity('tb_genders')
class Gender extends EnumEntity {
    
    @Column()
    name: string;

    @ManyToOne(() => Person, person => person.gender)
    persons: Person[]

}

export default Gender;