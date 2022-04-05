import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import Card from "../Card/Card";
import Domain from "../Domain";
import Person from "./Person";
import { RefreshToken } from "./RefreshToken";

@Entity('tb_users')
class User extends Domain {

    @Column()
    email: string;
    
    @Column()
    password: string;

    @OneToMany(() => Card, card => card.user, { cascade: true })
    cards: Card[];

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refresh_tokens: RefreshToken[];

    @OneToOne(() => Person, person => person.user, { cascade: true })
    person: Person;

}

export default User;