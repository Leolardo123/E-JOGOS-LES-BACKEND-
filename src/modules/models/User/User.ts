import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Gender from "./Gender";
import Person from "./Person";


@Entity('tb_users')
class User {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    person_id: string;

    @JoinColumn({name:'person_id'})
    @OneToOne(() => Person, person => person.user,{
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    person: Person;

}

export default User;