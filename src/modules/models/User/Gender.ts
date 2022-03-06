import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Person from "./Person";

@Entity('tb_genders')
class Gender {

    @PrimaryColumn()
    readonly id: number;
    
    @Column()
    name: string;

    @ManyToOne(() => Person, person => person.gender)
    persons: Person[]
}

export default Gender;