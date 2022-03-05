import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Person from "./Person";
import { RefreshToken } from "./RefreshToken";


@Entity('tb_users')
class User {

    @PrimaryColumn('uuid')
    readonly id: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    person_id: string;

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refresh_tokens: RefreshToken[];

    @JoinColumn({name:'person_id'})
    @OneToOne(() => Person, person => person.user,{
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    person: Person;

}

export default User;